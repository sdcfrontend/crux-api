const mongoose = require('mongoose');

const SiteSchema = mongoose.Schema({
  name: {
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
  },
  pages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pages'
  }]
});

module.exports = mongoose.model('Sites', SiteSchema);