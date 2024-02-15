// const express = require('express')

// const app = express()

// app.use((req, res, next)=> {
//     console.log("This is my first Middleware");
//     next();
// })

// app.get("/", (req, res)=> {
//     res.send("This the home page");
// })

// app.get("/details", (req, res)=> {
//     res.send("Details are below");
// })

// app.listen(8500, ()=> {
//     console.log("listening on port 8500");
// })

//Output = This is my first Middleware This the home page 

// const express = require('express')

// const app = express()

// app.use((req, res, next)=> {
//     console.log("This is my first Middleware");
//     next();
//     console.log("Hii am in middleware");
// })

// app.get("/", (req, res)=> {
//     res.send("This the home page");
// })

// app.get("/details", (req, res)=> {
//     res.send("Details are below");
// })

// app.listen(8500, ()=> {
//     console.log("listening on port 8500");
// })

// Output = This is my first Middleware This the home page Hii am in middleware
// First It goes to middleware function then next function is called then it goes to matching endpoint/route after executing it again goes to next function telling the response is over then and it executes the console.log(hii);

const express = require('express')

const app = express()

app.use((req, res, next)=> {
    console.log("a");
    next();
    console.log("b");
})

app.use((req, res, next)=> {
    console.log("c");
    next();
    console.log("d");
})

app.get("/", (req, res)=> {
    console.log("e");
    res.send("y");
    console.log("f");
})

app.get("/details", (req, res)=> {
    res.send("Details are below");
})

app.listen(8500, ()=> {
    console.log("listening on port 8500");
})

// Output = acefdb