import express,{Request,Response} from 'express';
import cors from 'cors';
import "dotenv/config"
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import myhotelsRoutes from './routes/my-hotels'
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("api/my-hotels", myhotelsRoutes)

app.listen(7000,()=>{
    console.log("server running on localhost:7000");
})