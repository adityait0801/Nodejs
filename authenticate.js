const express = require('express')
const { Authmodel } = require('./models/Authenticate.model');
const { connection } = require('./authmongoose');

const app = express()

app.use(express.json())

app.get('/', (req,res)=> {
    res.send('this is base route');
})

app.get('/users', async (req, res)=> {
    const users = await Authmodel.find();
    res.send(users);
})

app.post('/signup', async (req, res)=> {
    const { email, password} = req.body;
    const new_user = new Authmodel ({
        email,
        password 
    })
    await new_user.save();
    res.send({msg : "user inserted successfully", new_user});
})

app.post('/login', async (req, res)=> {
    const  {email, password} = req.body;
    const user = await Authmodel.findOne({email,password}); //find will give array of object where as findOne will give either 1 or null object.
    if(!user)
    {
        res.send({"message" : "login failed, invalid credentials"})
    }
    else
    {
        res.send({"message" : "login successfull"})
    }
})

app.listen(7000, async()=> {
    try{
    await connection
    console.log("Connected to MongoDB Successfully");
    }
    catch(err)
    {
        console.log(err);
        console.log("Error Connecting to DB");
    }
    console.log("listening on port 7000");
})