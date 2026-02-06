const express = require("express");
const app = express();
const port = 3000;



app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`);
});

app.get("/",(req, res)=>{
    res.send("You contacted root path");
})

app.get("/apple", (req, res)=>{
    res.send("You contacted apple path");
})
// Path parameters
app.get("/:username/:id", (req, res)=>{
    let {username, id} = req.params;
    res.send(`Hello ${username} your id is ${id}`);
    // console.log(req.params); 
});
//Query Strings
app.get("/search", (req, res)=>{
    // console.log(req.query);
    let {q} = req.query;
    if(!q){
        res.send(`<h1>No input found</h1>`);
    }
    res.send(`<h1>Your query was ${q}</h1>`);
});

app.use((req, res) => {
  res.status(404).send("This path does not exist");
});


// app.use((req,res)=>{
//     console.log("Request recieved");
//     // res.send("This is a basic response");
//     // res.send({
//     //     name: "apple",
//     //     color: "red",
//     // })
//     // res.send("<h1>Fruits</h1> <ul><li>Apple</li><li>orange</li></ul>");
// })