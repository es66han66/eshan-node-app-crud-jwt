const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 0
  },
  id: {
    type: String,
    required: true
  },
  password: { type: String, required: true },
  email: { type: String, required: true }
})

module.exports = UserSchema
