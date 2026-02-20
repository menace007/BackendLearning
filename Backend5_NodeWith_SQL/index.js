const {faker} = require("@faker-js/faker");
const mysql = require('mysql2');
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("view engint", "ejs");
app.set("views", path.join(__dirname, "/views"));
// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta',
  password: 'Rootn@c3#'
});
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
    ];
};
//Insert fake data to data array
// let data = [];
// for(let i=0;i<100;i++){
//     data.push(getRandomUser());
// }
// console.log(data);
//A simple query with database
// let q = "insert into user (id, username, email, password) values ?";

// try{
//     connection.query(q, [data], (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// } catch(err){
//     console.log(err);
// }
// connection.end();


app.get("/", (req, res)=>{
    let q = `select count(*) from user;`;
    try{
        connection.query(q, (err,result)=>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", {count});
        })

    }catch(err){
        res.send(err);
    }
});

app.get("/user", (req, res)=>{
    let q = `select id, username, email from user`;
    try{
        connection.query(q, (err, result) => {
            if(err) throw err;
            let users = result;
            res.render("users.ejs", {users});
        });

    } catch(err){
        console.log(err);
    }
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});