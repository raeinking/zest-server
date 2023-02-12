const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  english: {
    type: String
  },
  kurdish: {
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
  gender : {
    type: String,
  },
  image : {
    type: String,
  },
  descriptionenglish : {
    type: String,
  },
  descriptionkurdish : {
    type: String,
  },
  descriptionarabic : {
    type: String,
  },
  descriptionbadini : {
    type: String,
  },
  descriptionturkish : {
    type: String,
  },
  location : {
    type: String,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema)