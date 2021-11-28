const mongoose = require('mongoose')
const LoginSchema = mongoose.Schema({
    nom:{type:String, required:true},
    password:{type:String, required:true},
   // password:{type:String, required:true,minlength: 4},
})
module.exports = mongoose.model("Login", LoginSchema)