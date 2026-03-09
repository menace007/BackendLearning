const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


const MONGO_URL = "mongodb://127.0.0.1:27017/homelystay";
main()
    .then(()=>{
        console.log("Connected with DB successfully");
    })
    .catch((err) =>{
        console.log(err)
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

//Routes

app.get("/", (req, res)=>{
    res.send("Root");
});

//Index route => show all listing details
app.get("/listings", async(req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});        
});
//New and create route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
})
//Capture data from new.ejs
app.post("/listings", async(req, res)=>{
    const newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings");
});
//Edit and update route
app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});
//Capture data from edit.ejs and update
app.put("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
});
//Show route => read
app.get("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})
//Delete route 
app.delete("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});






























app.listen(port, ()=>{
    console.log(`Server is listening to port ${port}`);
})