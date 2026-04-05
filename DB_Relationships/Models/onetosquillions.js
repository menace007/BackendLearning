const mongoose = require("mongoose");
const {Schema} = mongoose;
main()
    .then(()=> console.log("Connection successful"))
    .catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username: String,
    email: String,
});

const User = mongoose.model("User", userSchema);

const postSchema = new Schema({
    content: String,
    likes: Number,
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Post = mongoose.model("Post", postSchema);

const addData = async()=>{
    // let user1 = new User({
    //     username: "menacew",
    //     email: "ctheman3456@gmail.com"
    // });
    let user2 = await User.findOne({username: "menacew"})
    let post2 = new Post({
        content: "I am not in mood",
        likes: 20
    });
    post2.user = user2;
    let res1 = await post2.save();
    console.log(res1);
}
// addData();

const getData = async()=>{
    let res = await Post.findOne({}).populate("user")
    console.log(res);
}
getData();