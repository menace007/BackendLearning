const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser")

app.use(cookieParser("secretcode"));

// Cookies concept
// app.get("/getcookies", (req, res)=>{
//     res.cookie("greet", "hello");
//     res.cookie("madein", "india");
//     res.send("Sent you some cookies");
// })

// Signed Cookies
app.get("/getsignedcookie", (req, res)=>{
    res.cookie("made-in", "India", {signed: true});
    res.send("Signed cookie sent!");
})

//Verify signed cookies
app.get("/verify",(req, res)=>{
    console.log(req.signedCookies);
    res.send("Verified");
})

app.get("/greet", (req, res)=>{
    let {name="anonynomous"} = req.cookies;
    res.send(`Hi, ${name}`);
})

//Root route
app.get("/", (req, res)=>{
    console.dir(req.cookies);
    res.send("Hi, I am root");
});

// to use routes i.e from user.js or post.js we have to use it like following
app.use("/users", users);
app.use("/posts", posts);







app.listen(3000, ()=>{
    console.log("Server is listening to port 3000");
})