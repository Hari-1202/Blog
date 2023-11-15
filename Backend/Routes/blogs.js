
const express = require('express')
const { isTokenValid } = require('../Controller/authController')
const { getAllBlogs, postUserBlog, updateUserBlog, getUserBlog, deleteUserBlog } = require('../Controller/blogController')
const router = express.Router()

router.get('/', getAllBlogs )

router.use(isTokenValid)
router.route('/me')
.post(postUserBlog)
.patch(updateUserBlog)
.get(getUserBlog)
.delete(deleteUserBlog)

module.exports = router


