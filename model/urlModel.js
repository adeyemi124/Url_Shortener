const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Url', UrlSchema);
