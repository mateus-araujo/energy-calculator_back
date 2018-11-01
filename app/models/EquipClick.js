const mongoose = require('../../database')

const EquipClickSchema = new mongoose.Schema({
  equip: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const EquipClick = mongoose.model('EquipClick', EquipClickSchema)

module.exports = EquipClick
