const http=require("http");
const fs=require("fs")
const url=require("url")


const server=http.createServer(handleServer);

function handleServer(req,res){

   // "/index.html","/about.html", "/code.js" "/style.css"
   const parseUrl= url.parse(req.url,true);
//console.log(parseUrl);

//    let filename=req.url.substring(1);
//     if(req.url=="/")
//         filename="index.html";
//     else if (req.url=="/about")
//         filename="about.html";

let file=true;
let filename=req.url.substring(1);
    if(parseUrl.pathname=="/")
        filename="index.html";
    else if (parseUrl.pathname=="/about")
        filename="about.html";
    else if (parseUrl.pathname=="/getData" && req.method=="GET")
    {
        file=false;

        res.write(`Welcome ${parseUrl.query.username} ${parseUrl.query.password}`);
        res.end();




    }

     else if (parseUrl.pathname=="/getData" && req.method=="POST")
    {
        file=false;
        //EVENTS data,end
let body=""
        req.on("data",(chunk)=>{
            body+=chunk;

        })
        req.on("end",()=>{
                console.log(body);
                const data=new URLSearchParams(body);
                //get("variablename")
                res.write(`Welcome ${data.get("username")} ${data.get("password")}`)
                res.end();
        })

       //res.write(`Welcome ${parseUrl.query.username} ${parseUrl.query.password}`);
        




    }


if(file)
    fs.readFile("./"+filename,"utf-8",(err,data)=>{
        if(err)
            res.end();
        else{
            res.write(data);
            res.end();
        }


        })


}

function handleRequest(req,res){

   // console.log(req.url);


    res.setHeader("Content-type","text/html")
    if(req.url=="/"){

        fs.readFile("./index.html","utf-8",(err,data)=>{
            res.write(data);
            res.end();


        })
    //res.write("<b>Hello</b> to client... from server...");
    //res.end();
    }
    else if(req.url=="/about.html")
    {
         fs.readFile("./about.html","utf-8",(err,data)=>{
            res.write(data);
            res.end();


        })

    }
    else if(req.url=="/style.css")
    {
         fs.readFile("./style.css","utf-8",(err,data)=>{
            res.write(data);
            res.end();


        })

    }
     else if(req.url=="/code.js")
    {
         fs.readFile("./code.js","utf-8",(err,data)=>{
            res.write(data);
            res.end();

        })

    }
    else if(req.url=="/abc")
    {
         res.write("abc request");
    res.end();

    }
    else
        res.end();


    
}
// server.on("connection",(socket)=>{
//     console.log("Client request...")
// })

server.listen(5000,(err)=>{
if(err)
    console.log("Error in starting server...")
else
    console.log("Server Started...")

});

