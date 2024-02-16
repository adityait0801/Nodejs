const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(cors({
    origin : "*",
}));

const gatekeeper = (req, res, next) => {
    if(req.method==="POST")
    {
        res.send("Not Found");
    }
    else
    {
    next();
    }
}

app.use(gatekeeper);

app.get("/", (req, res)=> {
    res.send("This the home page");
})

app.get("/details", (req, res)=> {
    fs.readFile("./db.json", "utf-8", (err, data)=>{
        if(err)
        {
            return res.status(500).send(err);
        }
        res.status(200).send(data);
    })
    // res.send("Details are below");
})

app.listen(8500, ()=> {
    console.log("listening on port 8500");
})

