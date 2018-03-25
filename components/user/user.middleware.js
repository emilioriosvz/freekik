const request = require('request')

const getUserFromGithub = (req, res, next) => {
  let params = []
  if (req.query.username) params.push(req.query.username)
  if (req.query.language) params.push(`language:${req.query.language}`)
  if (req.query.location) params.push(`location:${req.query.location}`)
  let url = `https://api.github.com/search/users?q=${params.join('+')}`

  var options = {
    method: 'GET',
    url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
    }
  }

  request(options, (error, response, body) => {
    if (error) return next(error)
    if (response.statusCode !== 200) return next(new Error(response.body))

    body = JSON.parse(body)
    if (!body.total_count) return next(new Error('No users found with this parameters'))
    req.users = body
    return next()
  })
}

module.exports = {
  getUserFromGithub
}
