const express = require('express');
const router = express.Router();
const db = require('../models');

// Create record
router.post('/', async (req, res) => {
  const record = new db.Record(req.body);

  try {
    const savedRecord = await record.save();

    res.json(savedRecord);
  }
  catch(error) {
    res.status(500).json(error.message)
  }
});

// Get page records
router.get('/:pageId', async (req, res) => {
  try {
    const records = await db.Record.find({pageId: req.params.pageId}).sort('-dateCreated');

    // Starting future paginated request
    // const records = await db.Record.find({'_id': {'$gt': req.body.lastId}}).limit(30)

    res.json(records);
  }

  catch(error) {
    res.status(500).json(error.message)
  }
});

module.exports = router;