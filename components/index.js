'use strict'

const express = require('express')
const userRoutes = require('./user/user.routes')
const postRoutes = require('./post/post.routes')
const authRoutes = require('./auth/auth.routes')

const router = express.Router()

router.use('/user', userRoutes)
router.use('/post', postRoutes)
router.use('/auth', authRoutes)

module.exports = router
