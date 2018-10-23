const mongoose = require('../../database')

const SearchSchema = new mongoose.Schema({
  equip: {
    type: String,
    require: true,
  },
  equipModel: {
    type: String,
    require: true,
  },
  refrigeratorOpenTimes: {
    type: String
  },
  capacityLiters: {
    type: String
  },
  procelSeal: {
    type: String,
    require: true,
  },
  useTime: {
    type: Number,
    require: true,
  },
  wattsPower: {
    type: Number,
    require: true
  },
  tax: {
    type: Number,
    require: true
  },
  costPerMonth: {
    type: Number,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Search = mongoose.model('Search', SearchSchema)

module.exports = Search
