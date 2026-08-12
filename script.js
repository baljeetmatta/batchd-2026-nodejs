//console.log("Javascript");
//console.log(module);
var url="https://rediff.com";


module.exports=url;
function logger()
{
    console.log("Logger function callled");
}
//module.exports=logger;

 //module.exports={url:url,logger:logger};
 //module.exports={url,logger};
module.exports.url=url;
module.exports.log=logger;



