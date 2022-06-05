const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// frontend gets all the posts
router.get('/', async (req, res) => {
  // frontend just call this page
  try {
    const posts = await Post.find();
    // res.json(posts);
    res.send(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// frontend submits a post
router.post('/', async (req, res) => {
  // frontend sends a formula to the server in json format
  // Server gets it as as object
  console.log(typeof req.body); // object
  console.log(JSON.stringify(req.body, null, 2));

  if (!!req.body.title && !!req.body.description) {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
    });
    try {
      const savedPost = await post.save();
    } catch (err) {
      res.json({ message: err });
    }
  }
});

// frontend wants to have a specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// frontend wants to delete a specific post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// frontend wants to update a post, which is already saved in database
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } });
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
