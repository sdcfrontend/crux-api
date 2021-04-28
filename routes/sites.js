const express = require('express');
const router = express.Router();
const db = require('../models');

// Create site
router.post('/', async (req, res) => {
  const site = new db.Site(req.body);

  try {
    const savedSite = await site.save();

    res.json(savedSite);
  }
  catch(error) {
    res.status(500).json(error.message)
  }
});

// Create new page on site
router.post("/:siteId", async (req, res) => {
  const page = new db.Page(req.body);

  try {
    const savedPage = await page.save();
    const updatedSite = await db.Site.findOneAndUpdate(
      {_id: req.params.siteId},
      {$push: {pages: savedPage._id}},
      {new: true}
    )
    const populatedSite = await updatedSite.populate('pages').execPopulate();

    res.json(populatedSite);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

// Get all sites
router.get("/", async (req, res) => {
  try {
    const populatedSites = await db.Site.find({}).populate('pages');

    res.json(populatedSites);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

// Get site and pages
router.get("/:siteId", async (req, res) => {
  try {
    const populatedSite = await db.Site.findOne({ _id: req.params.siteId }).populate('pages');

    res.json(populatedSite);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

// Update site
router.patch('/:siteId', async (req, res) => {
  const updateQuery = {};

  if (req.body.name) updateQuery.name = req.body.name;
  if (req.body.pages) updateQuery.pages = req.body.pages;
  if (req.body.name || req.body.pages) updateQuery.dateModified = Date.now();

  try {
    const updatedSite = await db.Site.findOneAndUpdate(
      {_id: req.params.siteId},
      {$set: updateQuery},
      {new: true}
    );
    const populatedSite = await updatedSite.populate('pages').execPopulate();

    res.json(populatedSite);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

// Delete site
router.delete("/:siteId", async (req, res) => {
  try {
    const site = await db.Site.findOne({ _id: req.params.siteId });
    const deletedPages = await db.Page.deleteMany({_id:{$in: site.pages}});

    if (!deletedPages) throw new Error('Failed to delete pages');

    const deletedSite = await db.Site.deleteOne({_id: req.params.siteId});

    res.json(deletedSite);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

module.exports = router;