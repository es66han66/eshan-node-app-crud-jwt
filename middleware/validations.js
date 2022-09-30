const Utility = require('../Utility')

class Validations {
  validateRegisterUserDetails (req, res, next) {
    const utility = new Utility()
    const userDetails = req.body
    const errorJSON = []
    if (!utility.isEmptyObject(userDetails)) {
      if (!userDetails.email) {
        errorJSON.push('email is required')
      } else {
        const validateEmail = utility.isString(userDetails.email, 'email')
        if (validateEmail.status === false) {
          errorJSON.push(validateEmail.error)
        }
      }

      if (!userDetails.name) {
        errorJSON.push('name is required')
      } else {
        const validateName = utility.isString(userDetails.name, 'name')
        if (validateName.status === false) {
          errorJSON.push(validateName.error)
        }
      }

      if (userDetails.age) {
        const validateAge = utility.isNumber(userDetails.age, 'age')
        if (validateAge.status === false) {
          errorJSON.push(validateAge.error)
        }
      }

      if (!userDetails.password) {
        errorJSON.push('password is required')
      } else {
        const validatePassword = utility.isString(
          userDetails.password,
          'password'
        )
        if (validatePassword.status === false) {
          errorJSON.push(validatePassword.error)
        }
      }

      if (errorJSON.length) {
        return res.status(400).json(errorJSON)
      }

      next()
    } else {
      return res.status(400).json('User Details format is incorrect')
    }
  }

  validateLoginRequest (req, res, next) {
    const utility = new Utility()
    const userDetails = req.body
    const errorJSON = []
    if (!utility.isEmptyObject(userDetails)) {
      if (!userDetails.email) {
        errorJSON.push('email is required')
      } else {
        const validateEmail = utility.isString(userDetails.email, 'email')
        if (validateEmail.status === false) {
          errorJSON.push(validateEmail.error)
        }
      }

      if (!userDetails.password) {
        errorJSON.push('password is required')
      } else {
        const validatePassword = utility.isString(
          userDetails.password,
          'password'
        )
        if (validatePassword.status === false) {
          errorJSON.push(validatePassword.error)
        }
      }

      if (errorJSON.length) {
        return res.status(400).json(errorJSON)
      }

      next()
    } else {
      return res.status(400).json('User Login Details format is incorrect')
    }
  }

  validatePatchUserDetails (req, res, next) {
    const utility = new Utility()
    const userDetails = req.body
    const errorJSON = []
    if (!utility.isEmptyObject(userDetails)) {
      if (userDetails.name) {
        const validateName = utility.isString(userDetails.name, 'name')
        if (validateName.status === false) {
          errorJSON.push(validateName.error)
        }
      }

      if (userDetails.age) {
        const validateAge = utility.isNumber(userDetails.age, 'age')
        if (validateAge.status === false) {
          errorJSON.push(validateAge.error)
        }
      }

      if (errorJSON.length) {
        return res.status(400).json(errorJSON)
      }

      next()
    } else {
      return res.status(400).json('User Patch Details format is incorrect')
    }
  }
}

module.exports = Validations
