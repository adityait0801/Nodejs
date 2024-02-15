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

app.get("/welcome", (req, res)=> {
    console.log(req.query);
    const user = req.query.name || "user";
    res.send("Welcome"+" "+user )
})

app.get("/details", (req, res)=> {
    console.log(req.query);
    // const name = req.query.name;
    // const age = req.query.age;

    const {name, age} = req.query;

    if(age>=18)
    {
        res.send("Details You are"+" "+name+" "+"is Eligible");
    }
    else
    {
        res.send("Details you are"+" "+name+" "+"is not Eligible");
    }
})

app.get("/lecture/:id", (req,res)=> {
    console.log(req.params);
    const number = req.params.id;
    res.send("Lecture"+" "+number);
})


app.listen(8000, () => {
    console.log("listening on port 8000")
    })