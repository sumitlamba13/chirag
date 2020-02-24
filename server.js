const express = require('express');
var app=express();
const path = require('path');
const bodyParser=require('body-Parser');
const mysql = require('mysql');

//connecting to database
var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"chirag"
});

con.connect(function(err){
  if(err) throw err;
  console.log("database connected");
});

app.use(express.static(path.join(__dirname,'public')));
//setting bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/facebooklogin',(req,res)=>{
    firstname=req.body.firstname;
    lastname=req.body.lastname;
    email=req.body.email;
    mobileno=req.body.mobileno;
    profilephoto=req.body.profilephoto;
    isVerified=req.body.isVerified;
    let query="Insert into fbUser (fname,flastname,femail,fmobileno,fdatecreated,fprofilephoto,fisVerified) values('"+firstname+"','"+lastname+"','"+email+"','"+mobileno+"',CURDATE(),'"+profilephoto+"','"+isVerified+"')";
    con.query(query,(err,result)=>{
      if (err) throw err;
      console.log(firstname);
      res.send(firstname);
    });
});
const PORT=process.env.PORT||5700;
app.listen(PORT,()=>{
  console.log(`listening to port 5700`);
});
