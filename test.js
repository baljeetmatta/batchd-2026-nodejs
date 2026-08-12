// const os=require("os");
// //console.log(data);
// console.log(os.freemem());
// console.log(os.totalmem());
// console.log(os.arch());

const fs=require("fs");
//const files=fs.readdirSync(__dirname);
//console.log(files);
fs.readdir(__dirname,(err,files)=>{
   
    console.log("called...",files);

})

fs.readFile("./test.js","utf-8",(err,data)=>{
     if(err)
        console.log(err);
    else
    console.log(data);

})
console.log("executing..")