var express = require('express');
var router = express.Router({
  mergeParams: true
});
const {
  User,
  ShoppingList,
  Item
} = require('../db/schema')



// SHOW ITEMS ON ONE LIST
router.get('/', function (req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      const shoppingList = user.shoppingLists.id(req.params.listId)
      const items = shoppingList.items.id(req.params.id)
      res.render('items/show', {
        user,
        shoppingList,
        items
      });
    })
});



// RENDER NEW ITEM FORM
router.get('/new', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      const shoppingList = user.shoppingLists.id(req.params.listId)
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
      user.shoppingLists.id(req.params.listId).items.push(newItem)
      return user.save()
    })
    .then(() => {
      res.redirect(`/users/${req.params.userId}/lists/${req.params.listId}`)
    })
})

// RENDER EDIT FORM FOR EACH ITEM
router.get('/:id/edit', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      var shoppingList = user.shoppingLists.id(req.params.listId)
      var items = shoppingList.items.id(req.params.id)
      res.render('items/edit', {
        user,
        shoppingList,
        items
      })
    })
})

// UPDATE ROUTE FOR LIST ITEM
router.put('/:id', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      var shoppingList = user.shoppingLists.id(req.params.listId)
      var newItem = shoppingList.items.id(req.params.id).set(req.body)
      console.log("IS IT DOING?", req.body)
      return user.save()
    })
    .then((user) => {
      res.redirect(`/users/${req.params.userId}/lists/${req.params.listId}/items/`)
    })
})

// DELETE LIST
router.delete('/:id', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      const oneList = user.shoppingLists.id(req.params.listId)
      const oneId = oneList.items.id(req.params.id)
      oneId.remove()
      return user.save()
    })
    .then(() => {
      res.redirect(`/users/${req.params.userId}`)
    })
})

module.exports = router;