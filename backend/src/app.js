import express from 'express';
import dotenv from "dotenv"
import AuthRouter from "./routes/auth.routes.js";
// import connectDB from './db/DB.js';
import cookiesParser from "cookie-parser"
dotenv.config({
    path: "../.env"
})

const PORT = process.env.PORT || 8000
const app = express();

app.use(express.json());
app.use(cookiesParser())

app.use('/api/v1/auth', AuthRouter)
app.get("/",(req,res)=>{
    res.send("Welcome to code learner")
})
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
// connectDB()
//     .then(() => {
//     })
//     .catch((err) => {
//         console.error("Mongodb connection error", err);
//         process.exit(1); //not needed but did there
//     })
export default app;