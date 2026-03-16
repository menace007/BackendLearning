const express = require("express");
const app = express();


//Middleware -> response send at first
// app.use(()=>{
//     console.log("Hi i am middleware");
// });

// app.use((req,res)=>{
//     let {query} = req.query;
//     console.log("Second middleware", query);
//     res.send("Blocked by middleware");
// })

// app.use((req,res,next)=>{
//     console.log("Time: ", Date.now().toLocaleString());
//     next();
// });

// app.use((req,res,next)=>{
//     console.log("Another middleware");
//     next();
// });

//Logger (useful information print on console)
app.use((req, res, next)=>{
    req.responseTime = new Date(Date.now());
    console.log(req.method, req.hostname, req.path, req.responseTime.toLocaleString("en-IN"));
    next();
})

const checkToken = ((req,res,next)=>{
    let{token}=req.query;
    if(token==="giveaccess"){
        next();
    }
    throw new Error("Access denied!");
});

// app.use("/api",(req,res,next)=>{
//     let {token} = req.query;
//     if(token === "giveaccess"){
//         next();
//     }
//     res.send("ACCESS DENIED!");
// })

app.use("/random", (req, res, next)=>{
    console.log("I am for random route and will be only executed if route is /random");
    next();
});

app.get("/", checkToken, (req, res)=>{
    res.send("Something");
});

app.get("/random", checkToken,(req,res)=>{
    res.send("This is a random page");
});

app.get("/api", checkToken, (req,res)=>{
    res.send("Some critical data");
})

app.get("/wrong",(req,res)=>{
    abcd = abcd;
});

//Page not found middleware
app.use((req,res)=>{
    res.status(404).send("404. Page not found");
});

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});