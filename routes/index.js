const express = require('express')
const router = express.Router()

const AuthController = require('../app/controllers/authController')
const SearchController = require('../app/controllers/searchController')
const AccessController = require('../app/controllers/accessController')

router.post('/access', AccessController.create)
router.post('/search', SearchController.create)

router.post('/auth/register', AuthController.create)
router.post('/auth/login', AuthController.login)
router.post('/auth/forgot_password', AuthController.forgotPassword)
router.post('/auth/reset_password', AuthController.resetPassword)


module.exports = app => app.use('/', router)
