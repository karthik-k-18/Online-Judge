import express from "express";
const router = express.Router();

// User
// user/signup
// user/login

router.post("/signup", (req, res) => {
    res.send("user signup");
    }
);

router.post("/login", (req, res) => {
    res.send("user login");
    }
);
