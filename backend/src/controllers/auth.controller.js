import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserRole } from "../generated/prisma/index.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";


export const register = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
         throw new ApiError(400, "All fields are required.", []);
    }
    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
         throw new ApiError(400, "User already exists.", []);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            role: UserRole.USER,
        },
    });

    if(!newUser) {
        throw new ApiError(500, "Something went wrong while creating.", []);
    }
    
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role,
                    image: newUser.image,
                },
            })
        );
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
        throw new ApiError(401, "User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return res.status(200).json(
        new ApiResponse(200, {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image,
            },
        }, "User logged in successfully")
    );
});


export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});

export const check = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Not authenticated.");
    }

    return res.status(200).json(
        new ApiResponse(200, {
            user: req.user,
        }, "User authenticated successfully")
    );
});
