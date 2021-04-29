const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
  pageId: {
    type: String,
    required: true
  },
  devices: {
    type: Object,
    default: {},
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  dateModified: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Record', RecordSchema);