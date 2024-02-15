const express = require('express');

const app = express()

app.get("/", (req, res)=> {
    res.send("this the home page");
})

app.get("/about", (req, res)=> {
    res.send("We are about to start");
})


app.listen(8000, () => {
    console.log("listening pn port 8000")
    })