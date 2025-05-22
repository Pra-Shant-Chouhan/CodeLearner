import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/apiError.js";
import { submitBatch } from "../libs/judge.lib.js";

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
    if (req.user.role !== "ADMIN") {
        throw new ApiError(403, "You are not allowed to create a problem", []);
    }
    try {
        for (const [language, solutionsCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language)
            if (!languageId) {
                throw new ApiError(403, `Language ${language} is not supported`, []);
            }
            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionsCode,
                language: languageId,
                stdin: input,
                expected_output: output,
            }))
            const submissionsResults = await submitBatch(submissions);
            const tokens = submissionsResults.map((res) => res.token);

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result-----", result);
                console.log(
                  `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
                );
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `Testcase ${i + 1} failed for language ${language}`,
                    });
                }
            }
        
    }
    } catch (error) {

}
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