const express = require('express')
const { Authmodel } = require('./models/Authenticate.model');
const { connection } = require('./authmongoose');
const jwt = require('jsonwebtoken');

const app = express()

const authentication = (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        return res.status(401).send("Login first");
    }
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        if (err) {
             return res.status(401).send("Please Login again");
        } else {
            next();
        }
    });
}


app.use(express.json())

app.get('/', (req,res)=> {
    res.send('this is base route');
})

app.get('/users', authentication, async (req, res)=> {
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

app.get('/reports', authentication, async (req, res)=> {
    res.send("Here are the reports");
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
