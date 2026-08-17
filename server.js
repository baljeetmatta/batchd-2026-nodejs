const http=require("http");
const fs=require("fs")


const server=http.createServer(handleRequest);
function handleRequest(req,res){

    console.log(req.url);


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

