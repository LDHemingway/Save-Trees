var express = require('express');
var router = express.Router();
const { User } = require('../db/schema')

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
  .then((users) => {
    res.render('users/index.hbs', { users });
  })
});

// NEW, RENDER NEW FORM
router.get('/new', (req, res) => {
  res.render('users/new')
})

// SHOW ONE
router.get('/:id', (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    res.render('users/show.hbs', {
      userId: req.params.userId
    })
  })
  
})








module.exports = router;