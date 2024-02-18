
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config"
declare global {
    namespace Express {
      interface Request {
        userId: string;
      }
    }
  }

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    console.log(token)
    if(!token) {
      console.log("from backend")
        return res.status(401).json({message:"unauthorized"});
       
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET as string);
        req.userId =(decode as JwtPayload).userId;
        next();
    } catch (error) {
        return res.status(401).json({message: "unauthorized"});
    }
}

export default verifyToken;