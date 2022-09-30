const mongoose = require('mongoose')

const connectDB = DB_URL => {
  mongoose.connect(DB_URL)

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error: '))
  db.once('open', function () {
    console.info('Connected successfully')
  })
}

module.exports = connectDB
