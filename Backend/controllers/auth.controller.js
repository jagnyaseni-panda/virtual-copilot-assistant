import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists !" });
        }

        if(password.length<6){
            return res.status(400).json({message: "Password must be at least 6 characters long !"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully !" });
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Internal server error !" });
    }
}