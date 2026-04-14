const express = require("express");
const router = express.Router();

//For users
//Index for users
router.get("/", (req, res)=>{
    res.send("Get request for users");
})
// Show for users
router.get("/:id", (req, res)=>{
    res.send("GET request for show users");
})
// POST for users
router.post("/", (req, res)=>{
    res.send("POST for users");
})
// Delete for users
router.delete("/:id", (req, res)=>{
    res.send("DELETE for users");
})

module.exports = router;