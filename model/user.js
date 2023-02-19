const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  number: {
    type: String,
  },
  clientname: {
    type: String,
  },
  level: {
    type: String,
  },
    date: {
    type:String
  },
    place: {
    type:String
  },
    project: {
    type:String
  },
    type: {
    type:String
  },
    call: {
    type:String
  },
});

module.exports = mongoose.model("users", AdminSchema)