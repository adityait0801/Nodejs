const express = require('express')
const connection = require('./mongoose')
const User_model = require('./models/User.model')

const app = express();

app.use(express.json())

app.get('/', (req, res)=> {
    res.send("api working, base route");
})

app.get('/users', async (req, res)=> {
    const users = await User_model.find({});
    res.send(users);
})

app.post('/users', async (req, res)=> {
    const user = req.body; //to get the data from the user
    console.log(user);
    await User_model.insertMany([user]);
    res.send({msg : "user inserted successfully", user});
})

//for inserting one document
app.post('/users', async (req, res)=> {
    const payload = req.body; //to get the data from the user
    console.log(payload);
    const new_user = new Usermodel.insertOne(payload);
    await new_user.save();
    res.send({msg : "user inserted successfully", new_user});
})

app.listen(8600, async()=> {
    try{
    await connection
    console.log("Connected to MongoDB Successfully");
    }
    catch(err)
    {
        console.log(err);
        console.log("Error Connecting to DB");
    }
    console.log("listening on port 8600");
})