const express = require('express')
const { Authmodel } = require('./models/Authenticate.model');
const { connection } = require('./authmongoose');
const jwt = require('jsonwebtoken');

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
        //here we are generating token, instead of random string we are using jwt library to generate the token
        const token = jwt.sign({}, 'shhhhh');
        //                         this is the secret code
        res.send({"message" : "login successfull", "token": token})
    }
})

app.get('/reports', async (req, res)=> {
    const {token} = req.query;
    if(!token)
        {
        res.send("Login first");
        }
//The 1st way of verifying      
    // else{
    //     //here we are verifying the secret
    //     const decoded = jwt.verify(token, 'shhhhh');
    //     //if the token is correct we will get the decoded object
    //     //if the toekn is wrong we will get an error
    //     console.log(decoded);
    //     if(token==decoded)
    //     {
    //     res.send("you can read secret details");
    //     }
    //     else{
    //         res.send("please login again");
    //     }
    // }
//The 2nd way of verifying 
jwt.verify(token, 'shhhhh', function(err, decoded) {
    if(err)
    {
        res.send(err);
        res.send("you can read secret details");
    }
    else
    {
        console.log(decoded);
        res.send("you can read secret details");
    }
    //The above code was written for only one endpoint i.e. /reports
  });
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