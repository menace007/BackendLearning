const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");



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
router.get("/", wrapAsync(async(req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});        
}));
//New and create route
router.get("/new", (req, res)=>{
    res.render("listings/new.ejs");
})
//Capture data from new.ejs
router.post("/", validateListing, wrapAsync(async(req, res, next)=>{
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
    req.flash("success", "New listing created");
    res.redirect("/listings");
}));
//Edit and update route
router.get("/:id/edit", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    if(!listing){
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
}));
//Capture data from edit.ejs and update
router.put("/:id", validateListing, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`);
}));
//Show route => read
router.get("/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}))
//Delete route 
router.delete("/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;