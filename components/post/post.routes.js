const express = require('express')
const router = express.Router()
const postCtrl = require('./post.controller')
const { checkIfTaggedUserExist } = require('./post.middleware')
const { loadUser } = require('../auth/auth.middleware')

router.route('/')
  .get(loadUser, postCtrl.getOwnPosts)
  .post(loadUser, checkIfTaggedUserExist, postCtrl.createPost)

router.route('/:postId')
  .get(postCtrl.getPost)
  .put(postCtrl.updatePost)

router.get('/:authorId/author', postCtrl.getPostByAuthor)

router.get('/:taggedUserId/taggedUser', postCtrl.getTaggedUserPost)

router.put('/:postId/deactivate', postCtrl.deactivatePost)
router.put('/:postId/activate', postCtrl.activatePost)

module.exports = router
