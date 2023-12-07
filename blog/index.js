const express = require('express');
const { connection } = require('./config/db');
const { router } = require('./routes/user.route');
const cookie = require('cookie-parser');
const { brouter } = require('./routes/blog.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookie()); 

app.use("/user",router);
app.use("/blog",brouter);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.get('/',(req,res)=>{
    res.send('Welcome to the movie API')
})

app.listen(8090, ()=>{
    console.log('port is running on port 8090');
    connection();
})