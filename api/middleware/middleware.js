const userDb = require('../users/users-model');


function logger(req, res, next) {
  // DO YOUR MAGIC
  const date = new Date();
  console.log(`${date} Method: ${req.method}  URL: ${req.path}`);
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params;
  userDb.getById(id)
  .then(user => {
    if(!user){
      res.status(404).json({ message: "user not found" })
    }else{
      req.user = user;
      next()
    }
  })
  .catch(err => {
    res.status(500).json({message: "The user information couldn't be retrieved"})
  })

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name} = req.body;
  
  if(name){
    next();
  }else{
    res.status(400).json({ message: "missing required name field" })
    return;
  }

}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const text = req.body.text;

  if(!text){
    res.status(400).json({ message: "missing required text field" })
  }else{
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUser, validateUserId , validatePost}