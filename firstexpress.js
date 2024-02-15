const express = require('express')
const fs = require('fs')

const app = express()
app.use(express.text())
app.use(express.json())

app.get("/", (req, res)=> {
    res.send("this the home page");
})

app.get("/about", (req, res)=> {
    console.log(req.url+" "+req.method);
    res.send("We are about to start"); //
})

app.post("/about", (req, res)=> {
    console.log(req.url+" "+req.method);
    console.log(req.body);
    res.send("We are about to start");
})

app.get("/posts", (req, res)=> {
    fs.readFile("./posts.json", "utf-8", (err, posts)=>{
        if(err)
        {
            return res.send(err);
        }
        res.send(posts);
    })
})


app.listen(8000, () => {
    console.log("listening pn port 8000")
    })