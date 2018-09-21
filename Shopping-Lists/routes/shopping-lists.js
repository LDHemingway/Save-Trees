var express = require('express');
var router = express.Router();
const { User } = require('../db/schema')
const { ShoppingList } = require('../db/schema')



// SHOW ONE
router.get('/:id', function(req, res, next) {
    ShoppingList.findById(req.params.id)
    .then((shoppingLists) => {
      res.render('shoppingLists/show.hbs', { shoppingLists });
    })
  });



  module.exports = router;
