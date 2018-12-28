require('dotenv').config
const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'development')
  mongoose.connect(`mongodb://${process.env.DEV_DB_HOST}/${process.env.DEV_DB_NAME}`,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    })
else if (process.env.NODE_ENV === 'production')
  mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
    `@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )

mongoose.Promise = global.Promise

module.exports = mongoose
