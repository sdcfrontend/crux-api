const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
  pageId: {
    type: String,
    required: true
  },
  metrics: {
    type: Array,
    default: [],
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now()
  },
  dateModified: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Record', RecordSchema);