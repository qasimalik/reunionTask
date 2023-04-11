const express = require('express');
const { authenticate } = require('../controllers/authController');
const { follow, unfollow, getUser, createPost, deletePost, likePost, unlikePost, createComment, getPost, getAllPosts} =  require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from the router');
});

router.post('/authenticate', authenticate);

router.get('/user', isAuthenticated, getUser);

router.post('/posts', isAuthenticated, createPost);

router.delete('/posts/:id', isAuthenticated, deletePost);

router.post('/like/:id', isAuthenticated, likePost);

router.post('/unlike/:id', isAuthenticated, unlikePost);

router.post('/comment/:id', isAuthenticated, createComment);

router.get('/posts/:id', isAuthenticated, getPost);

router.get('/all_posts', isAuthenticated, getAllPosts);

router.post('/follow/:id',isAuthenticated, follow);

router.post('/unfollow/:id',isAuthenticated, unfollow);


module.exports = router;