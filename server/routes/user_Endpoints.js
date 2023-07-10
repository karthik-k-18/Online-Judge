import express from "express";
const router = express.Router();
import {handleSignup,handleLogin} from "../controllers/UserController.js";


router.post("/signup", handleSignup);

router.post("/login", handleLogin);

export default router;
