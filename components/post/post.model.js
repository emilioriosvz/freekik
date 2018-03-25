const mongoose = require('mongoose')
const Schema = mongoose.Schema

var postSchema = new Schema({
  title: String,
  body: String,
  deactivated: { type: Boolean, default: false },
  picture: String,
  creator: { type: 'ObjectId' },
  taggedUsers: [{ type: 'ObjectId' }]
}, {
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
})

module.exports = mongoose.model('Post', postSchema)
