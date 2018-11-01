const Suggestion = require('../models/Suggestion')

const create = async (req, res) => {
  try {
    const { name, email, text } = req.body

    const suggestion = await Suggestion.create({ name, email, text })

    return res.send({ suggestion })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Error on save Suggestion' })
  }
}

module.exports = {
  create
}
