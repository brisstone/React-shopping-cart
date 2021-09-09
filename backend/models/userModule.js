var mongoose = require('mongoose');
const jwt = require('jsonwebtoken') ;

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
})


  


module.exports =  mongoose.model("User", userSchema);
