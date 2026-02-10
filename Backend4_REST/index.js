const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: "1a",
        username: "menace",
        content: "Learning how to code",
    },
    {
        id: "2b",
        username: "sujal",
        content: "Consistency is the key",
    },
    {
        id: "3c",
        username: "rare",
        content: "rare care",
    },
]

app.get("/", (req, res)=>{
    res.send("Root");
});

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("newpost.ejs");
});

app.post("/posts", (req,res)=>{
    let {username, content} = req.body;
    posts.push({username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.send("Working");
});




















app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});