// // const EventEmitter= require("events");
// // //console.log(events);
// // let emitter=new EventEmitter();

// // //emitter.emit("customMessage");//Raise

// // emitter.on("customMessage",(data)=>{ //Handle

// //     console.log("Event handled...",data)
// // })
// // emitter.on("done",()=>{

// // })

// // emitter.emit("customMessage",{data:10});//Raise


// // //EventEmitter x;




// const EventEmitter=require("events");

// const emitter=new EventEmitter();

// function logger(message)
// {
//     console.log(message);
//     emitter.emit("done");
// }
// module.exports.logger=logger;
// module.exports.emitter=emitter;



//version 2
const EventEmitter=require("events");
class LoggerClass extends EventEmitter
{

     logger(message){
        console.log(message);
        this.emit("done")


    }
}
module.exports=LoggerClass;
