import { OtpVarification, ResendOtp, StudentLogin, StudentSignup } from "../controller/auth.controller";
import express  from "express";
const authRouter = express.Router();

authRouter.post("/student/signup",StudentSignup );
authRouter.post("/student/varification/:id",OtpVarification );
authRouter.post("/student/login",StudentLogin );
authRouter.post("/student/resendOtp",ResendOtp );

export default authRouter