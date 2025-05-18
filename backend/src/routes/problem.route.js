import { Router } from "express";
import { authMiddleware, checkIsAdmin } from "../middlewares/auth.middleware.js";
import { createProblem, deleteSingleProblem, getAllProblems, getProblemById, updateSingleProblem } from "../controllers/problem.controller.js";

const problemRoutes = Router();

problemRoutes.post("/create-problems", authMiddleware, checkIsAdmin, createProblem);

problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems);

problemRoutes.get("/get-problem/:id", authMiddleware, getProblemById);

problemRoutes.get("/update-problem/:id", authMiddleware,checkIsAdmin, updateSingleProblem);

problemRoutes.delete("/delete-problem/:id", authMiddleware,checkIsAdmin, deleteSingleProblem);



export default problemRoutes;


