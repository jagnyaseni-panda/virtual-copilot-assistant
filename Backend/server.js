import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

// app.get("/",async(req,res) =>{
//   let prompt = req.query.prompt
//   let data = await geminiResponse(prompt)
//   res.json(data)
// })

app.listen(PORT, () => {
  connectDb()
  console.log(`Server is running on port ${PORT}`);
});