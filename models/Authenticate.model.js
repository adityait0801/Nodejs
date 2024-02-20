const mongoose = require('mongoose')

const authSchema =  mongoose.Schema({
    email : String, 
    password : String,
    role : {type : String ,enum : ['customer', 'maintainer'], default : "customer"}
})

const Authmodel = mongoose.model("user", authSchema)

module.exports = { Authmodel }