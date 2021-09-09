var mongoose = require('mongoose');
const jwt = require('jsonwebtoken') ;

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true}, 
    price: {type: String, default:0, required: true},
    countInStock: {type: String, default:0, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    nunReviews: {type: String, default:0, required: true},
    rating: {type: String, default:0, required: true},
})


  


module.exports =  mongoose.model("Product", productSchema);
