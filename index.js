const express=require("express");
const fs=require("fs");
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
            res.send("Invalid user/password")
        else
            res.send("Welcome user");
        

    })
})
app.listen(5000,(err)=>{
    if(!err)
        console.log("Server Started...")
});
