const Post = require('./post.model')

const getOwnPosts = async (req, res) => {
  const user = req.user
  let { skip, limit } = req.query
  limit = limit ? Number.isNaN(Number(limit)) ? 10 : Number(limit) : 10
  skip = skip ? Number.isNaN(Number(skip)) ? 0 : Number(skip) : 0

  try {
    var posts = await Post.find({ creator: user._id }, {}, { skip, limit })
  } catch (error) {
    return res.json({success: false, error})
  }

  return res.json({success: true, response: posts})
}

const getTaggedUserPost = async (req, res) => {
  const taggedUserId = req.params.taggedUserId
  let { skip, limit } = req.query
  limit = limit ? Number.isNaN(Number(limit)) ? 10 : Number(limit) : 10
  skip = skip ? Number.isNaN(Number(skip)) ? 0 : Number(skip) : 0

  try {
    var posts = await Post.find({ taggedUsers: { '$in': [taggedUserId] } }, {}, { skip, limit })
  } catch (error) {
    return res.json({success: false, error})
  }

  return res.json({success: true, response: posts})
}

const createPost = async (req, res, next) => {
  let post = req.body
  post.creator = req.user._id
  try {
    var postSaved = await Post.create(post)
    postSaved = postSaved.toJSON()
  } catch (error) {
    return next(error)
  }

  return res.json({success: true, response: postSaved})
}

const getPost = async (req, res) => {
  const postId = req.params.postId
  try {
    var post = await Post.findById(postId)
  } catch (error) {
    return res.json({success: false, error})
  }

  return res.json({success: true, response: post})
}

const updatePost = async (req, res) => {
  const postId = req.params.postId
  const post = req.body

  try {
    var updatedPost = await Post.findOneAndUpdate({ _id: postId }, post, { new: true })
    if (!updatedPost) throw new Error('Post not found')
  } catch (error) {
    return res.json({success: false, error: error.message})
  }

  return res.json({success: true, response: updatedPost})
}

const getPostByAuthor = async (req, res) => {
  const authorId = req.params.authorId
  try {
    var posts = await Post.find({ creator: authorId })
  } catch (error) {
    return res.json({success: false, error})
  }

  return res.json({success: true, response: posts})
}

const updatePostStatus = async (postId, deactivated = true) => {
  try {
    var updatedPost = await Post.findOneAndUpdate({ _id: postId }, { deactivated }, { new: true })
    if (!updatedPost) throw new Error('Post not found')
  } catch (error) {
    throw error
  }

  return updatedPost._doc
}

const deactivatePost = async (req, res) => {
  const postId = req.params.postId
  try {
    var updatedPost = await updatePostStatus(postId)
  } catch (error) {
    return res.json({success: false, error})
  }

  return res.json({success: true, response: updatedPost})
}

const activatePost = async (req, res) => {
  const postId = req.params.postId
  try {
    var updatedPost = await updatePostStatus(postId, false)
  } catch (error) {
    return res.json({success: false, error})
  }

  return res.json({success: true, response: updatedPost})
}

module.exports = {
  getOwnPosts,
  getTaggedUserPost,
  createPost,
  getPost,
  updatePost,
  getPostByAuthor,
  deactivatePost,
  activatePost
}
