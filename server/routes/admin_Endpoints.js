import express from "express";
const router = express.Router();
import { handleLogin } from "../controllers/AdminController.js";

router.post("/login", handleLogin);

export default router;
