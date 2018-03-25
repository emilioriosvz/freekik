const User = require('../user/user.model')
const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets.json')

const loadUser = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization']
  const secret = secrets.jwtSecret

  jwt.verify(token, secret, async (error, decoded) => {
    if (error) return next(error)
    try {
      var user = await User.findById(decoded.userId)
      if (!user) return next(new Error('User not found'))
    } catch (error) {
      return next(error)
    }
    req.user = user.toJSON()
    return next()
  })
}

module.exports = {
  loadUser
}
