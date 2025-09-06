import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/nodeApp'
const options = {
    useNewUrlParser: true,
    dbName: 'project'
}

export const db = mongoose.connect(url, options)