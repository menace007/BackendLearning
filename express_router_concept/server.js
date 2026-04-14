const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

app.get("/", (req, res)=>{
    res.send("Hi, I am root");
});

// to use routes i.e from user.js or post.js we have to use it like following
app.use("/users", users);
app.use("/posts", posts);







app.listen(3000, ()=>{
    console.log("Server is listening to port 3000");
})