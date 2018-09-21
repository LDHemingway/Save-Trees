const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemsSchema = new Schema ({
    name: String,
    quantity: String,
})

const ShoppingListSchema = new Schema ({
    name: String,
    items: [ItemsSchema]
})

const UserSchema = new Schema ({
    firstName: String,
    lastName: String,
    shoppingLists: [ShoppingListSchema]
})

const UserModel = mongoose.model('User', UserSchema)
const ShoppingListsModel = mongoose.model('Shopping-List', ShoppingListSchema)
const ItemsModel = mongoose.model ('Item', ItemsSchema)

module.exports = {
    User: UserModel,
    ShoppingList: ShoppingListsModel,
    Item: ItemsModel
}