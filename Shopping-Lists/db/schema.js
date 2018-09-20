const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema ({
    name: String,
    quantity: String,
})

const ShoppingListSchema = new Schema ({
    name: String,
    items: [ItemSchema]
})

const UserSchema = new Schema ({
    firstName: String,
    lastName: String,
    shoppingList: [ShoppingListSchema]
})

const UserModel = mongoose.model('User', UserSchema)
const ShoppingListModel = mongoose.model('Shopping-List', ShoppingListSchema)
const ItemModel = mongoose.model ('Item', ItemSchema)

module.exports = {
    User: UserModel,
    ShoppingList: ShoppingListModel,
    Item: ItemModel
}