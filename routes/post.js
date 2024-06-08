const express = require('express');
const auth = require('../middleware/auth');
const {postValidator ,validate, paramValidator} = require('../middleware/validators')
const { createPost, getPosts,getPost, updatePost, deletePost } = require('../controllers/Post');

const router = express.Router();

router.post('/create', auth, postValidator(), validate, createPost);
router.get('/getPosts', auth, getPosts);
router.get('/getPost/:id', auth,paramValidator(), validate, getPost);
router.put('/updatePost/:id', auth, postValidator(), paramValidator(), validate, updatePost);
router.delete('/deletePost/:id', auth, paramValidator(), validate, deletePost);

module.exports = router;