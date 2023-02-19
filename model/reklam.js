const mongoose = require('mongoose');
const reklamSchema = new mongoose.Schema({
  project: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reklam", reklamSchema)