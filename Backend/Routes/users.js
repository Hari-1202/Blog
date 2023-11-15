
/* eslint-disable no-undef */
const express = require('express')
const { isTokenValid } = require('../Controller/authController')
const { changePassword, getUserData } = require('../Controller/userController')

const router = express.Router()

router.patch('/changePassword', isTokenValid, changePassword)

router.get('/getUserDetails', isTokenValid, getUserData)

module.exports = router