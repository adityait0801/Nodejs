const mongoose = require('mongoose');
require('dotenv').config();
//const connection = mongoose.connect("mongodb://localhost:27017/dbnodejs") 
                                 //("URL of the MongoDB/database_name")

const main = async () => {
    try{
    const connection = await mongoose.connect(process.env.Mongo_URL);
    console.log("Connected to DB Successfully");
    }
    catch(err)
    {
        console.log(err);
    }
}
main();