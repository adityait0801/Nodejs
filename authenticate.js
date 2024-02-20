const express = require('express')
const { Authmodel } = require('./models/Authenticate.model');
const { connection } = require('./authmongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const app = express()

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDgzNzQ0MzB9.VSJAY7y36COK5FylxaUoydIEk0BpsnxgFMUaFc8TE8w
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

app.get('/contact', authentication, async (req, res)=> {
    //will the user send email & password ? "No"
    //token ? "Yes"
    const token = req.headers.authorization?.split(" ")[1];
    //by using token we can find the user in DB ? "No"
    //but by using token we can find the the user's ID ? "Yes"
    //because when we are doing login we are giving payload user id by using the user object
    var decoded = jwt.verify(token, 'shhhhh')
    const user_id = decoded.user_id;
    const user = await Auth.Authmodel.findOne({_id : user_id})
    const role = user.role;

    if(role==="customer")
    {
        res.send("Here is teh contact info");
    }
    else
    {
         res.status(401).send("Not Authorized");
    }
})

app.get('/users', authentication, async (req, res)=> {
    const users = await Authmodel.find();
    res.send(users);
})
app.post('/signup', async (req, res)=> {
    const { email, password} = req.body;
    //Here we are generating the hashing of pw
    bcrypt.hash(password, 8, async (err, hash) => {
        const new_user = new Authmodel ({
        email,
        password : hash
        // because in Schema we have defined pw as a key value pair.
    })
    await new_user.save();
    res.send({msg : "user inserted successfully", new_user});
    });
})
app.post('/login', async (req, res)=> {
    const  {email, password} = req.body;
    const user = await Authmodel.findOne({email}); //find will give array of object where as findOne will give either 1 or null object.
    //we found the user with respect to email
    //then w.r.to email we will get the hashed pw
    if(!user)
    {
        res.send({"message" : "login failed, invalid credentials"})
    }
    else    
    {
        const hashed_password = user.password;
        bcrypt.compare(password, hashed_password, (err, result) => {
            //password is the plain text pw which we are getting from user, hashd pw is the pw whcih is saved in the DB when the user has signed up.
            if(result)
            {
                 //here we are generating token, instead of random string we are using jwt library to generate the token
                const token = jwt.sign({user_id :user._id}, 'shhhhh');
                // while login we are giving payload user id by using the user object ,this is the secret code
                res.send({"message" : "login successfull", "token": token});
            }    
            else
                {
                    res.send({"message" : "login failed, invalid credentials"})
                }
        });
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
