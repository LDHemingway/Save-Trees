var express = require('express');
var router = express.Router({
  mergeParams: true
});
const {
  User,
  ShoppingList,
  Item
} = require('../db/schema')

// CREATE NEW ITEM
router.get('/new', (req, res) => {
    res.render('items/new', {
        ShoppingList
    })
  })



module.exports = router;