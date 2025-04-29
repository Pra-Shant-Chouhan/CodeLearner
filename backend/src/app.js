import express from 'express';
import dotenv from "dotenv"
import connectDB from './db/DB.js';

dotenv.config({
    path: "../.env"
})

const PORT = process.env.PORT || 8000
const app = express();

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
    })
    .catch((err) => {
        console.error("Mongodb connection error", err);
        process.exit(1); //not needed but did there
    })
export default app;