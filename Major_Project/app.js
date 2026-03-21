const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.engine('ejs', ejsMate);

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

//Create joi function instead of defining it again and again
const validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

//Index route => show all listing details
app.get("/listings", wrapAsync(async(req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});        
}));
//New and create route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
})
//Capture data from new.ejs
app.post("/listings", validateListing, wrapAsync(async(req, res, next)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    const newListing = new Listing(req.body.listing)
    // Instead of manually handling these kind of schema validations use one npm package called "joi"
    // if(!newListing.title){
    //     throw new ExpressError(400, "Title is missing")
    // }
    // if(!newListing.description){
    //     throw new ExpressError(400, "Description is missing")
    // }
    // if(!newListing.price){
    //     throw new ExpressError(400, "Price is missing")
    // }
    // if(!newListing.location){
    //     throw new ExpressError(400, "Location is missing")
    // }
    // if(!newListing.country){
    //     throw new ExpressError(400, "Country is missing")
    // }
    await newListing.save();
    res.redirect("/listings");
}));
//Edit and update route
app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));
//Capture data from edit.ejs and update
app.put("/listings/:id", validateListing, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
}));
//Show route => read
app.get("/listings/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
}))
//Delete route 
app.delete("/listings/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


//Middlewares for error handling
app.use((req, res, next)=>{
    next(new ExpressError(404, "Page Not Found"));  
})

app.use((err, req, res, next)=>{
    let {statusCode=500, message="Internal Server Error"} = err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
})



























app.listen(port, ()=>{
    console.log(`Server is listening to port ${port}`);
})