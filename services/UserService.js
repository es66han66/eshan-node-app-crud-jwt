const Utility = require('../Utility')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')
const userModel = require('../DB/Models/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserService {
  async registerUser (req, res) {
    console.info('POST - /user/register')
    try {
      let { name, age, password, email } = req.body
      age = age || 0
      const encryptedPassword = await bcrypt.hash(password, 10)
      const id = uuid()
      const user = new userModel({
        name,
        age,
        password: encryptedPassword,
        id: id,
        email: email
      })
      await user.save()
      return res.status(201).json(`User successfully created with ID ${id}`)
    } catch (error) {
      console.error('Error in POST - /user/register', error)
      return res.status(400).json(error)
    }
  }

  async loginUser (req, res) {
    console.info('GET - /user/all')
    try {
      const email = req.body.email
      const user = await userModel.findOne({ email: email })
      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const token = jwt.sign({ id: user.id, email }, process.env.TOKEN_KEY, {
          expiresIn: '2h'
        })
        return res.status(200).json({
          message: 'Successfully logged in',
          token: token
        })
      } else {
        return res.status(400).send('Invalid Credentials')
      }
    } catch (error) {
      console.error('Error in GET - /user/all', error)
      res.status(400).send(error)
    }
  }

  async getAllUser (req, res) {
    console.info('GET - /user/all')
    try {
      const utility = new Utility()

      const usersDetails = await userModel.find({})
      if (utility.isEmptyArray(usersDetails)) {
        return res.status(404).json('No users detail found')
      }
      return res.status(200).json(usersDetails)
    } catch (error) {
      console.error('Error in GET - /user/all', error)
      res.status(400).send(error)
    }
  }

  async getUserByID (req, res) {
    console.info('GET - /user/:userID')
    try {
      const utility = new Utility()

      const userDetails = await userModel.find({ id: req.params.userID })
      if (utility.isEmptyArray(userDetails)) {
        return res
          .status(404)
          .json(`No record found for user ID ${req.params.userID}`)
      }
      return res.status(200).json(userDetails)
    } catch (error) {
      console.error('Error in GET - /user/:userID', error)
      res.status(400).send(error)
    }
  }

  async updateUserByID (req, res) {
    console.info('PATCH - /user/:userID')
    try {
      const utility = new Utility()

      const userID = req.params.userID
      const usersDetails = await userModel.find({ id: userID })
      if (utility.isEmptyArray(usersDetails)) {
        return res.status(404).json('User not found')
      }
      if (req.body.id) {
        return res.status(400).json('ID cannot be updated')
      }
      await userModel.updateMany(
        { id: userID },
        {
          $set: req.body
        }
      )
      return res.status(200).json('Successfully Updated')
    } catch (error) {
      console.error('PATCH - /user/:userID', error)
      res.status(400).send(error)
    }
  }

  async deleteUserByID (req, res) {
    console.info('DELETE - /user/:userID')
    try {
      const utility = new Utility()

      const userID = req.params.userID
      const usersDetails = await userModel.find({ id: userID })
      if (utility.isEmptyArray(usersDetails)) {
        return res.status(404).json('User not found')
      }
      await userModel.deleteMany({ id: userID })
      return res.status(200).json('Successfully Deleted')
    } catch (error) {
      console.error('DELETE - /user/:userID', error)
      res.status(400).send(error)
    }
  }
}

module.exports = UserService
