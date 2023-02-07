import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const db = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URL)
        console.log('db connection successfully');
    } catch (error) {
        console.log(error.error)
    }
}

export default db;