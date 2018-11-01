const mongoose = require('../../database')

const SuggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Suggestion = mongoose.model('Suggestion', SuggestionSchema)

module.exports = Suggestion
