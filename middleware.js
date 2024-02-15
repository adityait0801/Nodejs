const express = require('express')

const app = express()

app.use((req, res, next)=> {
    console.log("This is my first Middleware");
    next();
})

app.get("/", (req, res)=> {
    res.send("This the home page");
})

app.get("/details", (req, res)=> {
    res.send("Details are below");
})

app.listen(8500, ()=> {
    console.log("listening on port 8500");
})