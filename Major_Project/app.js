const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews );


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