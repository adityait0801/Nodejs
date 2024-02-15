const express = require('express')
const fs = require('fs')
const { stringify } = require('querystring')

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
    const lecture_id = req.params.id;
    res.send("Lecture notes for"+" "+lecture_id);
})

app.get("/posts", (req, res)=> {
    fs.readFile("./posts.json", "utf-8", (err, posts)=>{
        if(err)
        {
            return res.status(500).send(err);
        }
        res.status(200).send(posts);
    })
})

app.get("/headers", (req, res)=> {
    console.log(req.headers);
    res.setHeader("Server", "local Server");
    res.send("Headers - additional information from server");
})

app.get("/reading", (req, res)=> {
    fs.readFile("./db.json", "utf-8", (err, data)=> {
        if(err)
        {
            return res.send("Something went wrong");
        } 
       const parsed_data = JSON.parse(data);
        res.send(parsed_data.instructors);
    })
})

app.post("/creating", (req, res)=> {
    const new_lecture = req.body; //to recive the data what client is sending.
    console.log(new_lecture);       
    // to store data into the file we have to stringify the data 
    fs.writeFile("./db.json",JSON.stringify(new_lecture), "utf-8", (err)=> {
        if(err) 
        {
            return res.send("Something went wrong");
        } 
            console.log("data written successfully");
        })
    res.send("Work in Progress");
})
// the above code will overwrite/replaced all the data in json file


app.post("/updating", (req, res)=> {
    const new_lecture = req.body; //to recive the data what client is sending.
    console.log(new_lecture);       
    fs.readFile("./db.json", "utf-8", (err, data)=> {
        if(err)
        {
            return res.send("Something went wrong");
        } 
       let parsed_data = JSON.parse(data);
       let lectures = parsed_data.lectures;
        lectures.push(new_lecture);
        let new_data = JSON.stringify(parsed_data);
        fs.writeFile("./db.json", new_data, "utf-8", (err)=>{
            res.send("data uploaded successfully");
        })
    })
    res.send("Work in Progress");
})


app.listen(8000, () => {
    console.log("listening on port 8000")
    })