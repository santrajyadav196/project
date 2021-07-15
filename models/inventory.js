const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    name: String,
    email: String,
    sku: String,
    description: String,
    price: Number,
    stock: Number
})

module.exports = mongoose.model('Inventory', InventorySchema);