const express = require('express')
const auth = require('./middleware/auth')
const connectDB = require('./DB/Connection')
const Validations = require('./middleware/validations')
const UserService = require('./services/UserService')
require('dotenv').config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const validation = new Validations()
const userService = new UserService()

connectDB(DB_URL)

const app = express()
app.use(express.json())

app.post(
  '/user/register',
  validation.validateRegisterUserDetails,
  userService.registerUser
)

app.get('/login/', validation.validateLoginRequest, userService.loginUser)

app.get('/user/', auth, userService.getAllUser)

app.get('/user/:userID', auth, userService.getUserByID)

app.patch(
  '/user/:userID',
  auth,
  validation.validatePatchUserDetails,
  userService.updateUserByID
)

app.delete('/user/:userID', auth, userService.deleteUserByID)

app.listen(PORT, () => {
  console.info('Server is running at port 3000')
})
