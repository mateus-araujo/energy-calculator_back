const EquipClick = require('../models/EquipClick')

const create = async (req, res) => {
  try {
    const { equip } = req.body

    const equipClick = await EquipClick.create({ equip })

    return res.send({ equipClick })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Error on save EquipClick' })
  }
}

module.exports = {
  create
}
