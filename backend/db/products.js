const mongoose = require("mongoose");

// Defining schema
const ProductSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userID: String,
    company: String
})

// The string in mongoose model argument should be collection name.
module.exports = mongoose.model("products", ProductSchema);