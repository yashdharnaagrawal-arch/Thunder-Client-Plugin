require("dotenv").config()
const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB connected")
    }
    catch(err){
        console.log("DB connection error", err);
    }
}

module.exports = connectDB;