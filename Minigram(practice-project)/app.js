const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts =[
    {
        id: uuidv4(),
        username: "menace",
        content: "I love you",
        photo: "https://images.unsplash.com/photo-1769265114267-9b3c74e14a54?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: uuidv4(),
        username: "jestin",
        content: "i am very moody",
        photo: "https://images.unsplash.com/photo-1769321467624-29f2c40e9e72?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: uuidv4(),
        username: "shubhanshu",
        content: "padhai k alawa sab kuch kar leta hoon",
        photo: "https://images.unsplash.com/photo-1769321600943-e449d94faa54?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

app.get("/", (req, res)=>{
    res.send("You are on root");
});

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

//To take new user information about posts
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});
app.post("/posts", (req,res)=>{
    let id = uuidv4();
    let{username, content, photo} = req.body;
    posts.push({id, username, content, photo});
    res.redirect("/posts");
});

//To view posts in detail with help of id
app.get("/posts/:id", (req,res)=>{
    let{id} = req.params;
    let post = posts.find((p)=> id === p.id);
    // console.log(post);
    if(post===undefined){
        res.send("404 Not Found. Your id may be incorrect");
    }
    res.render("show.ejs", {post});
});

//To edit or update your post
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let newPhoto = req.body.photo;
    let post = posts.find((p)=>id===p.id);
    if(post === undefined){
        res.send("Error id not matching.");
    }
    post.content = newContent;
    post.photo = newPhoto;
    res.redirect("/posts")
});

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})


















app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`);
});