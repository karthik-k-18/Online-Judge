import express from "express";
const router = express.Router();


router.post("/signup", (req, res) => {
    res.send("user signup");
    }
);

router.post("/login", (req, res) => {
    res.send("user login");
    }
);

export default router;
