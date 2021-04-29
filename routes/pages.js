const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all pages
router.get("/", async (req, res) => {
  try {
    const pages = await db.Page.find();

    res.json(pages);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

// Update page
router.patch('/:pageId', async (req, res) => {
  const updateQuery = {};

  if (req.body.name) updateQuery.name = req.body.name;
  if (req.body.url) updateQuery.url = req.body.url;
  if (req.body.name || req.body.url) updateQuery.dateModified = Date.now();

  try {
    const updatedPage = await db.Page.findOneAndUpdate(
      {_id: req.params.pageId},
      {$set: updateQuery},
      {new: true}
    );
    res.json(updatedPage);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

// Delete page from site
router.delete('/:pageId', async (req, res) => {
  if (!req.body.id) throw new Error('No Site ID given');
  
  try {
    const deletedPage = await db.Page.deleteOne({_id: req.params.pageId});

    if(!deletedPage) throw new Error('Page failed to delete');

    const updatedSite = await db.Site.findOneAndUpdate(
      {_id: req.body.id},
      {$pull: {pages: req.params.pageId}},
      {new: true}
    );
    const populatedSite = await updatedSite.populate('todos').execPopulate();

    res.json(populatedSite);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

module.exports = router;