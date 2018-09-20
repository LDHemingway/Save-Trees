var express = require('express');
var router = express.Router();
const { User } = require('../db/schema')

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
  .then((User) => {
    res.render('users/index.hbs', { User });
  })
});

// SHOW ONE
router.get('/:id', (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    res.render('users/show.hbs', {
      userId: req.params.userId
    })
  })
  
})

// NEW, RENDER NEW FORM
router.get('/new', (req, res) => {
  res.render('users/new.hbs')
})






module.exports = router;