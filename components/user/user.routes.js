const express = require('express')
const router = express.Router()
const userCtrl = require('./user.controller')
const userMiddleware = require('./user.middleware')

router.route('/')
  .get(userMiddleware.getUserFromGithub, userCtrl.saveFromGithubAndReturnUsers)

module.exports = router
