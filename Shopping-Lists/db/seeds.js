require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const Schema = require('./schema')

const { User, ShoppingList, Item } = Schema

const avocado = new Item({ name: 'avocado', quantity: '4'})
const milk = new Item({ name: 'milk', quantity: 'half gallon'})
const cereal = new Item ({ name: 'Cinnamon Toast Crunch', quantity: 'one box'})
const chips = new Item({ name: 'tortilla chips', quantity: 'one bag'})
const shirts = new Item({ name: 't-shirts', quantity: '2'})
const mascara = new Item ({ name: 'mascara', quantity: '1'})

const groceries = new ShoppingList({ name: 'Groceries', items: [avocado, milk, cereal, chips]})
const target = new ShoppingList({ name: 'Target', items: [shirts, mascara]})

const lauren = new User({ firstName: 'Lauren', lastName: 'Hemingway', shoppingLists:[target]})
const ben = new User({ firstName: 'Ben', lastName: 'McCombs', shoppingLists:[groceries]})

User.deleteMany()
  .then(() => {
    return User.insertMany([lauren, ben])
  })
  .then(() => {
    console.log('Done Seeding!')
    mongoose.connection.close()
  })