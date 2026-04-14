const express = require("express");
const router = express.Router();
//For posts
//Index for posts
router.get("/", (req, res)=>{
    res.send("Get request for posts");
})
// Show for posts
router.get("/:id", (req, res)=>{
    res.send("GET request for show posts");
})
// POST for posts
router.post("/", (req, res)=>{
    res.send("POST for posts");
})
// Delete for posts
router.delete("/:id", (req, res)=>{
    res.send("DELETE for posts");
})

module.exports = router;