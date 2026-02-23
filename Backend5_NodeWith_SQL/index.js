const {faker} = require("@faker-js/faker");
const mysql = require('mysql2');
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require("uuid");
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: true}));
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

// Add new user
app.get("/user/new", (req, res)=>{
    let id = uuidv4();
    res.render("newUsers.ejs", {id});
});

app.post("/user/:id/new", (req,res)=>{
    let{id} = req.params;
    let{username, email, password} = req.body;
    // console.log(username, email, password);
    let q = `insert into user values ('${id}', '${username}', '${email}', '${password}')`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            // res.send(result);
            res.render("/user");
        })
    }catch(err){
        console.log(err);
    }
});
//Edit route
app.get("/user/:id/edit", (req, res)=>{
    let {id} = req.params;
    let q = `select * from user where id = '${id}'`;
     try{
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        });

    } catch(err){
        console.log(err);
        res.send("Some error in DB");
    }
});
//Update route(DB)
app.patch("/user/:id", (req, res)=>{
    let {id} = req.params;
    let {username: newUsername, password:formPassword} = req.body;
    let q = `select * from user where id = '${id}'`;
    try{
        connection.query(q, (err,result)=>{
            if(err) throw err;
            let user = result[0];
            if(formPassword != user.password){
                res.send("Wrong password");
            }
            else{
                let q1 = `update user set username = '${newUsername}' where id ='${id}'`;
                try{
                    connection.query(q1, (err, result)=>{
                        if(err) throw err;
                        res.redirect("/user");
                    })
                }catch(err){
                    res.send(err);
                }
            }
        });
    } catch(err){
        console.log(err);
        res.send(err);
    } 
});

app.delete("/user/:id", (req,res)=>{
    let {id} = req.params;
    let q = `delete from user where id = '${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            res.redirect("/user");
        });
    }catch(err){
        res.send("Some error in DB");
    }
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});