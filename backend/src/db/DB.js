import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
// import {DB_NAME} from 

const connectDB = async () => {
    try {
        // 
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection Failed", error);
        process.exit(1)
    }
}
export default connectDB