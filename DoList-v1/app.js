const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var items = [];
var workItem = [];
app.get("/",(req,res)=>{
    let day = date.getDate();
    res.render("index",{listTitle:day,newListItems:items});
});
app.post("/",(req,res)=>{
    //console.log(req.body);
    let i = req.body.item;
    if(req.body.list==="Work"){
        workItem.push(i);
        res.redirect("/work");
    }
    else{
        items.push(i);
        res.redirect("/");
    }
});

app.get("/work",(req,res)=>{
    res.render("index",{listTitle:"Work List",newListItems:workItem});
});

app.post("/work",(req,res)=>{
    let i = req.body.item;
    workItem.push(i);
    res.redirect("/work");
});
app.get("/about",(req,res)=>{
    res.render('about');
});
app.listen(3000,()=>{
    console.log("Server Stated on port 3000");
});