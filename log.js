//const logger=require("./eventsModule");
//const EventEmitter=require("events");
// const emitter=new EventEmitter();
// emitter.on("done",()=>{
//     console.log("logger completed...")
// })

// const eventsModule=require("./eventsModule");
// //logger,emitter
// eventsModule.emitter.on("done",()=>{
//     console.log("logger complete...")
// })
// eventsModule.logger("My Work");

//version 2
const LoggerClass=require("./eventsModule");
const loggerClass=new LoggerClass();

loggerClass.on("done",()=>{
    console.log("Completed...")
})
loggerClass.logger("My Work");


