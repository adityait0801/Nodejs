const mongoose = require('mongoose');
require('dotenv').config();
//const connection = mongoose.connect("mongodb://localhost:27017/dbnodejs") 
                                 //("URL of the MongoDB/database_name")

const main = async () => {

    const userSchema = mongoose.Schema({
        name : String,
        city : String
    }) 

    const user_model = mongoose.model("user", userSchema);
       // user_model is acting as a collection in MongoDB concept 

    try{
    const connection = await mongoose.connect(process.env.Mongo_URL);
        //this will connect to the DB S/w and the DB File inside it.
    console.log("Connected to DB Successfully");

        await user_model.insertMany([{name : "Aditya", city :"Raipur"},{name : "Adi", city : "Rpr"}]);
            // the above will act as a document as i MongoDB concept.
        //since it may take time to insert data in DB beacuse of slow internet or xyz reasons so we will put inside the async operation 
        console.log("Inserted data successfully");

    connection.disconnect();
    }
    catch(err)
    {
        console.log(err);
    }
}
main();