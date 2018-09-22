var express = require('express');
var router = express.Router({
  mergeParams: true
});
const {
  User,
  ShoppingList,
  Item
} = require('../db/schema')



// NEW LIST
router.get('/new', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.render('shoppingLists/new', {
        user
      })
    })
})

// SHOW ONE
router.get('/:id', function (req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      const shoppingList = user.shoppingLists.id(req.params.id)
      res.render('shoppingLists/show', { user, 
        shoppingList
      });
    })
});

//CREATE 
router.post('/', (req, res) => {
  console.log('OMG ITS HAPPENING', req.body)
  const itemOne = new Item({
    name: req.body.items[0],
    quantity: req.body.quantity[0]
  })
  const itemTwo = new Item({
    name: req.body.items[1],
    quantity: req.body.quantity[1]
  })
  const itemThree = new Item({
    name: req.body.items[2],
    quantity: req.body.quantity[2]
  })
  const itemFour = new Item({
    name: req.body.items[3],
    quantity: req.body.quantity[3]
  })
  const listItems = [itemOne, itemTwo, itemThree, itemFour]
  const newList = new ShoppingList({
    name: req.body.name,
    items: listItems
  })
  User.findById(req.params.userId)
    .then((user) => {
      console.log('FOUND USER', user, newList)
      user.shoppingLists.push(newList)
      return user.save()
    })
    .then((user) => {
      res.redirect(`/users/${req.params.userId}`)
    })
})

// DELETE LIST
router.delete('/:id', (req, res) => {
  userId = User.findById(req.params.userId)
  ShoppingList.remove(req.params.id)
  .then (() => {
    console.log('deleted')
    res.redirect('/users/userId')
  })
})


module.exports = router;