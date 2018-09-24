var express = require('express');
var router = express.Router({
  mergeParams: true
});
const {
  User,
  ShoppingList,
  Item
} = require('../db/schema')

// RENDER NEW ITEM FORM
router.get('/new', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      const shoppingList = user.shoppingLists.id(req.params.id)
      res.render('items/new', {
        user,
        shoppingList: shoppingList
      })
    })
})


// POST NEW ITEM ROUTE
router.post('/', (req, res) => {
  const newItem = new Item(req.body)
  User.findById(req.params.userId)
    .then((user) => {
      user.ShoppingLists.findById(req.params.id)
    })
    .then((user) => {
      user.shoppingList.Items.push(newItem)
      return user.save()
    })
    .then((user) => {
      res.redirect(`/users/${user._id}`)
    })
})

module.exports = router;