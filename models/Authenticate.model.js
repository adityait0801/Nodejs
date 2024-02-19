const mongoose = require('mongoose')

const authSchema =  mongoose.Schema({
    email : String, 
    password : String
})

const Authmodel = mongoose.model("user", authSchema)

module.exports = { Authmodel }