import { User } from "../models/models.js";
import { generateToken } from "../middlewares/jwt_token.js";

const handleLogin = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ name:username , password }); //asynchronous function
        if(!user){
            return res.status(400).json({ message: "Invalid username or password!" });
        }
        const token = generateToken(username, "admin"); // admin role
        res.status(200).json({ message: "User logged in successfully!", token });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

export { handleLogin };