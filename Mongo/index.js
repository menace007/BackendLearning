const mongoose = require('mongoose');

main()
    .then(()=>{
        console.log("Connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("User", userSchema);

// const user1 = new User({
//     name: "Manish",
//     email: "gautamanesh2469@gmail.com",
//     age: 25
// });

// User.insertMany([
//     {name: "Shubhanshu", email: "markam12@gmail.com", age: 28},
//     {name: "Jestin", email: "jestin.johnofficial@gmail.com", age:24},
//     {name: "Rahul", email: "rahulranjan@yahoo.com", age: 24}
// ])
//     .then(()=>console.log("Data inserted successfully"))
//     .catch((err)=> console.log(err));

// User.find({}).then((data)=>{
//     console.log(data);
// })

// User.find({age: {$gte: 25}})
//     .then((data)=>{
//         console.log(data);
//     })
//     .catch(err => console.log(err));

// User.findOne({age: {$gte: 25}})
//     .then((data)=>{
//         console.log(data);
//     })
//     .catch(err => console.log(err));

// User.updateOne({name: "Jestin"}, {age: 21}).then(res=>{
//     console.log(res);
// })
// User.updateMany({age: {$gt: 21}}, {age: 27}).then(res=>console.log(res));
// User.findOneAndUpdate({name: "Manish"}, {name: "Manesh", age: 25}, {new:true}).then(data => console.log(data));

// User.deleteOne({name: "Gaurav"}).then(res => console.log(res));
// User.deleteMany({age: {$gt: 25}}).then(res => console.log(res));

// User.findByIdAndDelete("69a6d7f92a974cc05dd125a4").then(res => console.log(res));
