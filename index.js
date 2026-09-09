const express=require("express");
const sess=require("express-session");//function
const path=require("path")
const fs=require("fs");
const app=express();
const cors=require("cors");
const userRoutes=require("./routes/userRoutes");
//   /dashboard, /profile

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());

app.use(express.static("."));
app.use(express.urlencoded({extended:true}))
app.use(sess({
    secret:"sdsa#$#$",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60
    }

}))
app.use("/user",auth,userRoutes);

//extended:false->Basic data
//variable=value&variable=value
//complex 
//user[name]=value&user[data]=value
/*
Endpoint
*/

app.post("/signup",(req,res)=>{
    console.log(req.body);
    //res.end();
    //1. Existing users fetch, 
    // 2. Username duplicate, 
    // 3. new user array push 
    // 4. File write

    fs.readFile("./users.json","utf-8",(err,data)=>{
        //1. Fetch existing users
        let users=[];
        if(err)
            users=[];
        else 
            users=JSON.parse(data);

       let results= users.filter((item)=>{
        if(item.username==req.body.username)
            return true;

        })
        if(results.length!=0)
            res.send("User already exists");
        else
        {
            users.push({
                name:req.body.name,
                username:req.body.username,
                password:req.body.password
            })
            fs.writeFile("./users.json",JSON.stringify(users),(err)=>{
                res.send("User Created...")
            })

        }





    })

})


// app.post("/login",(req,res)=>{

//     //1. Fetch users
//     //2. Username password exists
//     fs.readFile("./users.json","utf-8",(err,data)=>{
//         let users=[]
//         if(err)
//             users=[];
//         else
//             users=JSON.parse(data);

//         let results=users.filter((item)=>{
//             if(item.username==req.body.username && item.password==req.body.password)
//                 return true;

//         })
//         if(results.length==0)
//             res.send("Invalid user/password")
//         else
//         {
//             req.session.name=results[0].name;

//             res.redirect("/user/dashboard")
//         }
        

//     })
// })


app.post("/login",(req,res)=>{

    //1. Fetch users
    //2. Username password exists
    fs.readFile("./users.json","utf-8",(err,data)=>{
        let users=[]
        if(err)
            users=[];
        else
            users=JSON.parse(data);

        let results=users.filter((item)=>{
            if(item.username==req.body.username && item.password==req.body.password)
                return true;

        })
        if(results.length==0)
            res.json({success:false,message:"Invalid user/password"});

            //res.send("Invalid user/password")
        else
        {
            req.session.name=results[0].name;
res.json({success:true,message:"Welcome"});
         //   res.redirect("/user/dashboard")
        }
        

    })
})
// app.get("/dashboard",auth,(req,res)=>{

//      res.send("Welcome to dashboard "+req.session.name);

// //     if(req.session.name)
// //     res.send("Welcome to dashboard "+req.session.name);
// // else
// //     res.redirect("/login");

//     //res.sendFile(path.join(__dirname,"./login.html"));



// })

// app.get("/profile",auth, (req,res)=>{
//     res.send("Profile Page")
// })


app.get("/login",(req,res)=>{

     res.sendFile(path.join(__dirname,"./login.html"));
})
function auth(req,res,next)
{
    if(req.session.name)
        next();
    else
        return res.redirect("/login");



}
app.listen(5000,(err)=>{
    if(!err)
        console.log("Server Started...")
});
//AUTHENTICATION
