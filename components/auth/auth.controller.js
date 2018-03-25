const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets.json')
const User = require('../user/user.model')

const login = async (req, res, next) => {
  try {
    var user = await User.findOne({ login: req.body.username }, {login: 1, _id: 1})
    if (!user) throw new Error('User not found')
  } catch (error) {
    return next(error)
  }

  user = user.toJSON()

  const token = jwt.sign({
    userId: user._id
  }, secrets.jwtSecret)

  return res.json({success: true, response: token})
}

module.exports = {
  login
}
