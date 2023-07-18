import express from "express";
const router = express.Router();
import { getProblems, getProblem ,submitProblem} from "../controllers/ProblemController.js";
import { authenticateUser } from "../middlewares/authenticate.js";
import { authorizeUser } from "../middlewares/authorize.js";

router.get("/all", authenticateUser ,getProblems);
router.get("/:id", authenticateUser ,getProblem);
router.post("/:id/submit", authenticateUser ,submitProblem);


export default router;
