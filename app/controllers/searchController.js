const Search = require('../models/Search')

const create = async (req, res) => {
  try {
    const {
      equip, equipModel, refrigeratorOpenTimes,
      procelSeal, useTime, wattsPower, tax, costPerMonth
    } = req.body

    const search = await Search.create({
      equip, equipModel, refrigeratorOpenTimes,
      procelSeal, useTime, wattsPower, tax, costPerMonth
    })

    return res.send({ search })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Error on save Search' })
  }
}

module.exports = {
  create
}
