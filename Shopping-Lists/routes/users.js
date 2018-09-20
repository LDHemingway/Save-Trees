var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('/users/login');
});

module.exports = router;

// SHOW ONE
router.get('/:id', (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    res.render('users/show', {
      userId: req.params.userId
    })
  })
  
})