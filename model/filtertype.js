const mongoose = require('mongoose');
const filtertypeSchema = new mongoose.Schema({
  english: {
    type: String
  },
  sorani: {
    type: String,
  },
  arabic: {
    type: String,
  },
  turkish: {
    type: String,
  },
  badini: {
    type: String,
  },
  image : {
    type: String,
  },
});

module.exports = mongoose.model("filtertype", filtertypeSchema)