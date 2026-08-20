//express
const path=require("path");
const express= require("express");

//middleware

//const server=http.createServer((req,res)=>{
/*
if(req.url=="/")
{
}
else if (req.url=="/about")
{
}
*/

   
// });
 const app= express();

//middleware
app.use(express.static("."));
//post
app.use(express.urlencoded({extended:true}));





app.get("/",(req,res)=>{
   //  res.write("Hello to server...")
    // res.end();
//content-type :text/html
    //res.send("Welcome to server..");
    //File Path -->Absolute Path->root directory
    //console.log(__dirname);
    // __dirname -> root directory
    // Relative Path w.r.t current directory
    // ./index.html. ./data/index.html

    // __dirname (Absolute)
    // filename (relative)
    //absoulte path

   // res.send("Welcome to Home PAge")
   res.sendFile(path.join(__dirname,"./home.html"));




})

// app.get("/style.css")



app.get("/getData",(req,res)=>{

    console.log(req.query.username,req.query.password);

    res.send(`Welcome ${req.query.username}`);

    // query(true)
})

app.post("/getData",(req,res)=>{
//get req.query
//pot req.body

 res.send(`Welcome ${req.body.username}`);

})

 app.listen(5000,(err)=>{

    if(err)
        console.log("unable to start the server...");
    else
        console.log("server started...")
 })