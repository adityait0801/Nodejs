const express = require('express')
const { Authmodel } = require('./models/Authenticate.model');
const { connection } = require('./authmongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const app = express()

app.use(express.json())

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDgzNzQ0MzB9.VSJAY7y36COK5FylxaUoydIEk0BpsnxgFMUaFc8TE8w
    if (!token) {
        return res.status(401).send("Login first");
    }
    jwt.verify(token, 'shhhhh',  async function(err, decoded) {
        if (err) {
             return res.status(401).send("Please Login again");
        } else {
            const user_id = decoded.user_id;
            const user = await Authmodel.findOne({user_id});
            userRole = user.role;
            //In the below code we have modified the request and so we pass paased req beacuse req will come first at authentication and then authorisation
            req.userRole = userRole;
            next();
        }
    });
}

const authorisation = (permittedRoles) => {
    return async (req, res, next) => {
        // In the below we will recieve user role in the req object passed through authentication 
        const userRole = req.userRole;
        if(permittedRoles.include(userRole))
            {
                next();
            }
        else
            {
                res.send("Not Authorized");
            }
        }
}

app.get('/', (req,res)=> {
    res.send('this is base route');
})

app.post('/signup', async (req, res)=> {
    const { email, password, role} = req.body;
    //Here we are generating the hashing of pw
    bcrypt.hash(password, 8, async (err, hash) => {
        const new_user = new Authmodel ({
        email,
        password : hash,
        role
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
            //password is the plain text pw which we are getting from user, hashed pw is the pw whcih is saved in the DB when the user has signed up.
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

//single role authorization
app.get('/contact', authentication, authorisation(["customer"]),async (req, res)=> {
    res.send("Here is the contact info");
})

//single role authorization
app.get('/users', authentication, authorisation(["maintainer"]),async (req, res)=> {
        const users = await Authmodel.find();
        res.send(users);
})
//Mutliple role authorisation
app.get('/reports', authentication, authorisation(["customer","maintainer"]), async (req, res)=> {
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
