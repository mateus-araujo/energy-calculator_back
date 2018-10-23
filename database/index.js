require('dotenv').config
const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'development')
  mongoose.connect(`mongodb://${process.env.DEV_DB_HOST}/${process.env.DEV_DB_NAME}`, 
  {
    useCreateIndex: true,
    useNewUrlParser: true
  })
else if (process.env.NODE_ENV === 'production')
  mongoose.connect(`mongodb://${process.env.PROD_DB_USER}:${process.env.PROD_DB_PASSWORD}` +
    `@${process.env.PROD_DB_HOST}:${process.env.PROD_DB_PORT}/${process.env.PROD_DB_NAME}`,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )

mongoose.Promise = global.Promise

module.exports = mongoose
