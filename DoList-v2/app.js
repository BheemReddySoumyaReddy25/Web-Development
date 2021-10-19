const express = require("express");
const bodyParser = require("body-parser");
var _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/toDoListDB',{ useUnifiedTopology: true ,useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
    name :String
})
const Item = mongoose.model("Item",itemsSchema);
const item1 = new Item({
    name:"Buy Food"
})
const item2 = new Item({
    name:"Eat Food"
})
const item3 = new Item({
    name:"Cook Food"
})
const defaultItem = [item1,item2,item3];
const listSchema = new mongoose.Schema( {
    name:String,
    items:[itemsSchema]
})
const List = mongoose.model("List",listSchema);
var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    Item.find({},function(err,foundItems){
        if(foundItems.length==0){
            Item.insertMany(defaultItem,function(err){
                if(err)
                    console.log(err);
                else
                    console.log("Succesfully added Default items");    
            });
            res.redirect("/");
        }
        else
            res.render("index",{listTitle:"Today",newListItems:foundItems});
    });
});
app.post("/",(req,res)=>{
    //console.log(req.body);
    let itemName = req.body.item;
    const new_item = new Item({
        name:itemName
    });
    if(req.body.list==="Today"){
        new_item.save();
        res.redirect("/");
    }
    else{
        List.findOne({name:req.body.list},function(err,foundList){
            if(!err){
                foundList.items.push(new_item);
                foundList.save();
                res.redirect("/"+req.body.list);
            }
        });
    }
});

app.post("/delete",(req,res)=>{
    const itemId = req.body.checkbox;
    const customTitle = req.body.ListTitle;
    console.log(customTitle);
    if(customTitle==="Today"){
        Item.findByIdAndRemove(itemId,function(err){
            if(err)
                console.log(err);
            else
            res.redirect("/");
        });
    }
    else{
        List.findOneAndUpdate({name:customTitle},{$pull:{items:{_id:itemId}}},function(err,foundList){
            if(!err){
                res.redirect("/"+customTitle);
            }
        });
    }
});


app.get("/:customName",(req,res)=>{
    const customListName =_.capitalize(req.params.customName);
    
    List.findOne({name:customListName},function(err,foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name:customListName,
                    items:defaultItem
                });
                
                list.save();
                res.redirect("/"+customListName);
            }
           
            else{
                res.render("index",{listTitle:foundList.name,newListItems:foundList.items});
            }
        }
            
    });
})

app.listen(3000,()=>{
    console.log("Server Stated on port 3000");
});