const mongoose = require('mongoose');

    const userSchema = mongoose.Schema({
        name : String,
        city : String,
        age : Number
    }) 

    const User_model = mongoose.model("user", userSchema);
       // user_model is acting as a collection in MongoDB concept 

module.exports = User_model

