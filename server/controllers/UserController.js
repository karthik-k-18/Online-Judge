import { User } from "../models/models.js";
import { generateToken } from "../middlewares/jwt_token.js";

const handleSignup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ name:username });
    if (user) {
        return res.status(400).json({ message: "User already exists!" });
    }
    await User.create({ name: username, password });
    const token=generateToken(username, "user");
    res.status(201).json({ message: "User created successfully!", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleLogin = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ name:username , password }); //asynchronous function
        if(!user){
            return res.status(400).json({ message: "Invalid username or password!" });
        }
        const token = generateToken(username, "user");
        res.status(200).json({ message: "User logged in successfully!", token });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

export { handleSignup, handleLogin };