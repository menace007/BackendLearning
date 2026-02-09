const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

//serving static files->for css and javascript files
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set("view engine", "ejs");//view->templates
//To run from anywhere
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res)=>{
    res.render("home.ejs");
});

app.get("/rolldice", (req, res)=>{
    let diceVal = Math.floor(Math.random()*6)+1
    res.render("rolldice.ejs", {num: diceVal})
});

app.get("/ig/:username", (req, res)=>{
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    // console.log(data);
    res.render("ig.ejs", {data});
});

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});