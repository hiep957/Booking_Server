import express,{Request,Response} from 'express';
import cors from 'cors';
import "dotenv/config"
import mongoose from 'mongoose';
import userRouter from './routes/users'
import authRouter from './routes/auth'
import cookieParser from "cookie-parser";
mongoose.connect(process.env.MONGO_URL as string);
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

app.get("/api/test",async (req:Request,res:Response)=>{
    res.json({message: "Hello from express endpoint!"});
})

app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);

app.listen(7000,()=>{
    console.log("server running on localhost:7000");
})