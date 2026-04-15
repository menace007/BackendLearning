const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");



const validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

//Review Add route
router.post("/", validateReview, wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Added!")
    // console.log("New review saved");
    res.redirect(`/listings/${listing._id}`);
}));

//Reviews Delete Route
router.delete("/:reviewid", wrapAsync(async(req, res)=>{
    let{id, reviewid} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewid}});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review Deleted!")
    res.redirect(`/listings/${id}`)
}));

module.exports = router;