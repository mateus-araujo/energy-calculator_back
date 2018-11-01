const express = require('express')
const router = express.Router()

const AuthController = require('../app/controllers/authController')
const SearchController = require('../app/controllers/searchController')
const AccessController = require('../app/controllers/accessController')
const EquipClickController = require('../app/controllers/equipClickController')
const SuggestionController = require('../app/controllers/suggestionController')

router.post('/access', AccessController.create)
router.post('/search', SearchController.create)
router.post('/equip_click', EquipClickController.create)
router.post('/suggestion', SuggestionController.create)

router.post('/auth/register', AuthController.create)
router.post('/auth/login', AuthController.login)
router.post('/auth/forgot_password', AuthController.forgotPassword)
router.post('/auth/reset_password', AuthController.resetPassword)


module.exports = app => app.use('/', router)
