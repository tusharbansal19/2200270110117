const mongoose =require("mongoose");

const connect=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017");
        console.log("MongoDB OK");
    }
    catch(e){
        console.log(e);
    }
    finally{
        console.log("Done");
    }
}

module.exports={connect}


