const express = require('express')
const fs = require('fs')

const app = express()

const timer= (req, res, next) => {
    const startTime = new Date().getTime();
    next();
    const endTime = new Date().getTime();
    console.log(req.method+" "+req.url)
    console.log(endTime - startTime);
}

app.use(timer);

app.get("/", (req, res)=> {
    res.send("This the home page");
})

app.get("/details", (req, res)=> {
    fs.readFile("./posts", "utf-8", (err, data)=>{
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

