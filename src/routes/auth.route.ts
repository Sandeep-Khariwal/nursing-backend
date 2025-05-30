import {  Login, OtpVarification, Signup, } from "../controller/auth.controller";
import express  from "express";
const authRouter = express.Router();

authRouter.post("/signup",Signup );
authRouter.post("/varification",OtpVarification );
authRouter.post("/login",Login );

// authRouter.post("/student/resendOtp",ResendOtp );

export default authRouter