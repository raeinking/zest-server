const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roll : {
    type: String,
    default: 'user'
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", AdminSchema)