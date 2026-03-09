//Initialization logic
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
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

const initDB = async ()=>{
   await Listing.deleteMany({});
   await Listing.insertMany(initdata.data);
   console.log("Data initialized successfully");
}

initDB();