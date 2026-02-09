const express = require("express");
const app = express();
const port = 8080;
//Parse POST request data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Root");
});

app.get("/register", (req, res)=>{
    let {user, password} = req.query;
    res.send(`Standard GET response. Welcome ${user}`);
});

app.post("/register", (req, res)=>{
    let {user, password} = req.body;
    // console.log(user, password);
    res.send(`Standard POST response. Welcome ${user}!`);
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});













