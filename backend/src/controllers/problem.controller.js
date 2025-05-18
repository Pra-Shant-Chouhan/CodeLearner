import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../libs/db.js";

export const createProblem = asyncHandler(async (req, res) => {
    // going to get all the data form req.body 
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions
    } = req.body;
    // going to check the user once again 
    // loop through each referce solutions for diffrently languages 
})

export const getAllProblems = asyncHandler(async (req, res) => {

})

export const getProblemById = asyncHandler(async (req, res) => {

})

export const updateSingleProblem = asyncHandler(async (req, res) => {

})
export const deleteSingleProblem = asyncHandler(async (req, res) => {

})
export const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {

})