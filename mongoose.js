const mongoose = require('mongoose');
require('dotenv').config();
//const connection = mongoose.connect("mongodb://localhost:27017/dbnodejs") 
                                 //("URL of the MongoDB/database_name")

    const userSchema = mongoose.Schema({
        name : String,
        city : String
    }) 

    const User_model = mongoose.model("user", userSchema);
       // user_model is acting as a collection in MongoDB concept 

    const connection = mongoose.connect(process.env.Mongo_URL);  

module.exports = {
    connection,  User_model
}
