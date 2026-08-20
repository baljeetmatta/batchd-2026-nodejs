const express=require("express");
const app=express();
app.use(express.static("."));
app.use(express.urlencoded({extended:true}))
//extended:false->Basic data
//variable=value&variable=value
//complex 
//user[name]=value&user[data]=value
/*
Endpoint
*/

app.listen(5000);
