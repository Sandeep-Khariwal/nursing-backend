import { authenticateToken } from "../middleware/jwtToken";
import {  Login, LogOut, OtpVarification, Signup, } from "../controller/auth.controller";
import express  from "express";
const authRouter = express.Router();

authRouter.post("/signup",Signup );
authRouter.post("/varification",OtpVarification );
authRouter.post("/login",Login );
authRouter.put("/logout",authenticateToken,LogOut );

// authRouter.post("/student/resendOtp",ResendOtp );

export default authRouter