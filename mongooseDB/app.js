const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/fruitsDB',{useNewUrlParser:true});

 const fruitSchema = new mongoose.Schema({
     name:String,
     rating:{
         type:Number,
         min:1,
         max:10,
         required:[true,"Rating is not found"]
        },
     review:String
 });
 const Fruit = mongoose.model("Fruit",fruitSchema);
 const apple = new Fruit({
     name:"Apple",
     rating:"7",
     review:"Pretty solid fruit"
 });
 const kiwi = new Fruit({
     name:"Kiwi",
     rating:10,
     review:"The Best fruit"
 });
 const orange = new Fruit({
     name:"Orange",
     rating:5,
     review:"Orange is sour"
 });
 const banana = new Fruit({
     name:"Banana",
     rating:"7",
     review:"Its sweet"
 });
/*Fruit.insertMany([apple,kiwi,orange,banana],function(err){
     if(err)
        console.log(err);
     else
     console.log("Successful");   
 })*/
 // fruit.save();
 Fruit.find(function(err,fruits){
    if(err)
        console.log(err);
    else
        console.log(fruits);    
 });