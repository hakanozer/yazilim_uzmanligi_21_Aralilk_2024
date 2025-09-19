import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/nodeApp'
const options = {
    dbName: 'project'
}

export const connectDB = async () => {
    try {
        await mongoose.connect(url, options)
        console.log("Connection Success")
    } catch (error) {
        console.error("Connection Error :" + error)
    }
}