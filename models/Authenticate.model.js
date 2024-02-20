const mongoose = require('mongoose')

const authSchema =  mongoose.Schema({
    email : String, 
    password : String,
    role : {type : String , default : "customer", enum : ['customer', 'maintainer']}
})

const Authmodel = mongoose.model("user", authSchema)

module.exports = { Authmodel }