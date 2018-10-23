const mongoose = require('../../database')

const AccessSchema = new mongoose.Schema({
  accuracy: {
    type: Number
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Access = mongoose.model('Access', AccessSchema)

module.exports = Access
