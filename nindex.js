// EJS(Embedded Javascript) HBS(Handlebars)
const express=require("express");
const app=express();
const path=require("path");
const fs=require("fs");

app.use(express.static("."));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");

//EJS View ->Render->html->client

app.get("/home",(req,res)=>{

    res.render("home",{name:"Code"});  // views->home.ejs
    //res.render("home");

})
app.post("/login",(req,res)=>{

   // res.sendFile(path.join(__dirname,"./dashboard.html")
    res.render("home",{name:req.body.username});



})
app.get("/usersReact",(req,res)=>{


    fs.readFile("./users.json","utf-8",(err,data)=>{
        let users=[];
        if(err)
            users=[];
        else
            users=JSON.parse(data);

        res.json({users});

    })

})

app.get("/users",(req,res)=>{
     fs.readFile("./users.json","utf-8",(err,data)=>{
        let users=[];
        if(err)
            users=[];
        else
            users=JSON.parse(data);

        res.render("usersList",{users});
        

    })
})

app.listen(5000,(err)=>{
    if(!err)
        console.log("Server Started...")
})