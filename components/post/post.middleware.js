const User = require('../user/user.model')

const checkIfTaggedUserExist = async (req, res, next) => {
  try {
    let taggedUsers = req.body.taggedUsers
    for (let taggedUser of taggedUsers) {
      let user = await User.findById(taggedUser)
      if (!user) return next(new Error(`Tagged Users must exist in User Collection. User not found: ${taggedUser}`))
    }
    next()
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  checkIfTaggedUserExist
}
