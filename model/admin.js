const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
  },
  number: {
    type: String,
    required: true,
  },
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
    default: 'Employee'
  }
});

module.exports = mongoose.model("Admin", AdminSchema)