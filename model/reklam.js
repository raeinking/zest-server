const mongoose = require('mongoose');
const reklamSchema = new mongoose.Schema({
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reklam", reklamSchema)