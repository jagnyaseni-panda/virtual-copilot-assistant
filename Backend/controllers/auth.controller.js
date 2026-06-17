import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
            sameSite: "strict",
            secure: false
        });
        return res.status(201).json(user);
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal server error !" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password !" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password !" });
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
            sameSite: "strict",
            secure: false
        });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error !" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully !" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error !" });
    }
}