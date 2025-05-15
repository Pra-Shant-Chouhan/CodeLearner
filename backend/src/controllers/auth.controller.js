import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserRole } from "../generated/prisma/index.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return apiError(res, 400, "All fields are required.");
    }
    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })
    if (existingUser) {
        return apiError(res, 400, "User already exists.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            role: UserRole.USER
        }
    })
    const token = jwt.sign({ id: newUser.id, }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
    return res.status(201).ApiResponse({
        statusCode: 201, data: {
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                image: newUser.image
            }
        }
    })
});

export const login = async (req, res) => {

};

export const logout = async (req, res) => {

};

export const check = async (req, res) => {

};