const express=require("express");
const routes=express.Router();
routes.get("/dashboard",(req,res)=>{
    res.send("Welcome "+req.session.name);

})
routes.get("/profile",(req,res)=>{
    res.send("Profile Page")
})
module.exports=routes;

