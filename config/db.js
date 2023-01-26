const mongoose = require('mongoose');
const colors = require('colors')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongo DB database connected!".bgGreen.white);
    } catch (error) {
        console.log("Mongo db connection error".bgRed.white);
    }
}

module.exports = connectDB;