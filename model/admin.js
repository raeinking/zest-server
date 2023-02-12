const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  // email: {
  //   type: String,
  //   unique: true
  // },
  // number: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  },
  roll : {
    type: String,
    default: 'user'
  }
});

module.exports = mongoose.model("Admin", AdminSchema)