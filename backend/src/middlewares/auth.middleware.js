import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError";
import { db } from "../libs/db.js"
export const authMiddleware = asyncHandler(async (req, res, next) => {

    if (!token) {
        throw new ApiError(401, "Unauthorized - No token provided.")
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch {
        throw new ApiError(401, "Unauthorized - Invalid provided.")

    }
    const user = await db.user.findUnique({
        where: {
            id: decoded.id
        },
        select:{
            id:true,
            image:true,
            name:true,
            email:true,
            role:true
        }
    });
    if(!user){
        throw new ApiError(404,"User not found.")
    }
    req.user = user;
    next();
})

export const checkIsAdmin = asyncHandler(async(req,res,next)=>{
 const userId = req.user.id
 const user = await db.user.findUnique({
    whe
 })
})