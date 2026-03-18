const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main()
    .then(console.log("Connected with database whatsapp"))
    .catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
};

let allChats = [
    {
        from: "Shubhanshu",
        to: "Jestin",
        msg: "I am sorry.",
        created_at: new Date()
    },
    {
        from: "Adarsh",
        to: "Rahul",
        msg: "Paro bsdk warna fir se back lagjayega",
        created_at: new Date()
    },
    {
        from: "Aqib",
        to: "Anshul",
        msg: "Kya hua bhai.. kya hua.. kar raha hoon na",
        created_at: new Date(),
    },
    {
        from: "Gaurav",
        to: "Aman",
        msg: "Ye kya hai, ye to bekar hai isko ese mat karo",
        created_at: new Date()
    }
]

Chat.insertMany(allChats)
    .then(console.log("Initialized and saved init.js data successfully"))
    .catch(err => console.log(err));

