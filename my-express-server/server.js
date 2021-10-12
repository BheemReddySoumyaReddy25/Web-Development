const { request } = require("express");
var express = require("express");
var app = express();
var body_parser = require("body-parser");
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json());
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get('/hobbies',function(req,res){
    res.send("<ul><li>coffee</li><li>code</li></ul>");
})
app.post('/',(req,res)=>{
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var sum = num1+num2;
    res.send("The sum of two number is "+sum);
})
app.get('/bmicalculator',(req,res)=>{
    res.sendFile(__dirname+'/bmiCalculator.html');
})
app.post('/bmicalculator',(req,res)=>{
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    res.send("Your BMI is "+Math.ceil(weight/(height*height)));
})
app.listen(3000,function(){
    console.log("Server is started on port 3000");
})