import express from "express";
const router = express.Router();
import { getProblems, getProblem ,submitProblem} from "../controllers/ProblemController.js";

router.get("/all", getProblems);
router.get("/:id", getProblem);
router.post("/:id/submit", submitProblem);


export default router;
