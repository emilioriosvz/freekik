const User = require('./user.model')

const saveFromGithubAndReturnUsers = async (req, res) => {
  const users = req.users.items

  const save = async user => {
    try {
      let userSaved = await User.findOneAndUpdate({ login: user.login }, user, { upsert: true })
      return userSaved.toJSON()
    } catch (error) {
      throw error
    }
  }
  Promise.all(users.map(user => save(user)))
    .then((response) => {
      return res.send({ success: true, response })
    })
    .catch(error => res.send({ success: false, error: error.message }))
}

module.exports = {
  saveFromGithubAndReturnUsers
}
