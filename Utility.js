class Utility {
  isString (value, name) {
    return typeof value === 'string'
      ? value.length
        ? {
            status: true,
            error: ''
          }
        : {
            status: false,
            error: `${name} is empty`
          }
      : {
          status: false,
          error: `${name} is not a string`
        }
  }

  isNumber (value, name) {
    return typeof value === 'number'
      ? {
          status: true,
          error: ''
        }
      : {
          status: false,
          error: `${name} is not a number`
        }
  }

  isEmptyObject (value) {
    if (
      value &&
      !Array.isArray(value) &&
      typeof value === 'object' &&
      Object.keys(value).length
    ) {
      return false
    } else {
      return true
    }
  }

  isEmptyArray (value) {
    if (value && Array.isArray(value) && value.length) {
      return false
    }
    return true
  }
}

module.exports = Utility
