const mongoose = require('mongoose');

function connectDB(){
    try {
        mongoose.connect("mongodb://localhost:27017")
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {
    connectDB
}