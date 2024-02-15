const express = require('express')

const app = express()

const logger= (req, res, next) => {
    console.log(req.method+" "+req.url);
    next();
}

app.use(logger);

app.get("/", (req, res)=> {
    res.send("This the home page");
})

app.get("/details", (req, res)=> {
    res.send("Details are below");
})

app.listen(8500, ()=> {
    console.log("listening on port 8500");
})

