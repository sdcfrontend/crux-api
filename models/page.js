const mongoose = require('mongoose');

const PageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1
  },
  url: {
    type: String,
    required: true,
    minLength: 1
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

module.exports = mongoose.model('Pages', PageSchema);