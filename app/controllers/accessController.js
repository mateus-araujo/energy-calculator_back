const Access = require('../models/Access')

const create = async (req, res) => {
  try {
    const { accuracy, latitude, longitude } = req.body

    const access = await Access.create({ accuracy, latitude, longitude })

    return res.send({ access })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Error on save Access' })
  }
}

module.exports = {
  create
}
