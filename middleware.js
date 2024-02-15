const express = require('express')

const app = express()

const random_character_middleware = () => {
    console.log("Hi from Middleware");
}

app.get("/", (req, res)=> {
    res.send("This the home page");
})

app.use(random_character_middleware);

app.get("/details", (req, res)=> {
    res.send("Details are below");
})

app.listen(8500, ()=> {
    console.log("listening on port 8500");
})

