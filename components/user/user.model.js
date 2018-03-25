const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  login: String,
  id: Number,
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: Boolean,
  score: Number
})

module.exports = mongoose.model('User', userSchema)
