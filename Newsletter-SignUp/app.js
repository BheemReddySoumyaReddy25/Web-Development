const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
var app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json);
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})
app.post("/",(req,res)=>{
    const key = "b422bc8cda4a557f54fa9ec121fcbafa-us6";
    const listid ="301afbc055";
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const data = {"members":
                    [
                        {
                            "email_address":email,
                            "status": "subscribed",
                            "merge_fields":{
                                FNAME:fname,
                                LNAME:lname
                            }
                        }
                    ],
                    "update_existing":false
                }
   const jsondata = JSON.stringify(data);
   const options = {
       method:"POST",
       auth:"soumya:"+key
   }
   const url = "https://us6.api.mailchimp.com/3.0/lists/"+listid
   const request1=https.request(url,options,function(response){
     
        response.on("data",function(data){
            var returnData = JSON.parse(data)
            // var errorEmail = returnData.errors[0].email_address;
            // var errorMsg = returnData.errors[0].error;
            var duplicatMail = returnData.error_count;
        
            if (duplicatMail === 1)	{
                    res.sendFile(__dirname + "/failure.html");
            } else if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
            console.log(returnData);
        })
   })
   request1.write(jsondata);
   request1.end();           
})
app.post("/failure",(req,res)=>{
    res.redirect("/");
});
app.listen(4000)