const mongoose = require('mongoose')
const UserSchema = require('../Schema/UserSchema')

const User = mongoose.model('User', UserSchema)

module.exports = User
