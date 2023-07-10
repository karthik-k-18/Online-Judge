import express from "express";
const router = express.Router();
import { getProblems, getProblem } from "../controllers/ProblemController.js";

router.get("/all", getProblems);
router.get("/:id", getProblem);

export default router;
