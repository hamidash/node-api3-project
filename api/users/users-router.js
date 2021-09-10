const express = require('express');
const middlewares = require('../middleware/middleware')
const userDb = require('./users-model');
const postDb = require('../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  //RETURN AN ARRAY WITH ALL THE USERS
  userDb.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: "The user information couldn't be retrieved"})
  })
  
});

router.get('/:id', middlewares.validateUserId,(req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
res.status(200).json(req.user)
 
});

router.post('/', middlewares.validateUser,(req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
   userDb.insert(req.body)
   .then(user => {
     res.status(201).json(user)
   })
   .catch(err => {
     res.status(500).json({message: "The new user information couldn't be created"})
   })
});

router.put('/:id', middlewares.validateUserId, middlewares.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params;
  const {name} = req.body;
  userDb.update(id, {name})
  .then(user => {
    console.log(user);
    res.status(200).json({id, name});

  })
  .catch(err => {
    res.status(500).json({message: "The user information couldn't be updated"})
  })
});

router.delete('/:id', middlewares.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const {id} = req.params;
  userDb.remove(id)
  .then(user => {
    console.log(user);
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({message: "The user information couldn't be removed"})
  })
});

router.get('/:id/posts', middlewares.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const {id} = req.params;
  userDb.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({message: "The user posts couldn't be found"})
  })
});

router.post('/:id/posts', middlewares.validateUserId, middlewares.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {text} = req.body;
  //const user = req.user;

  postDb.insert({text})
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({message: "The new post couldn't be created"})
  })
});

// do not forget to export the router
module.exports = router;