import { authenticateToken, LogoutMiddleware } from "../middleware/jwtToken";
import {  DeleteAcount, Login, LogOut, OtpVarification, Signup, } from "../controller/auth.controller";
import express  from "express";
const authRouter = express.Router();

authRouter.post("/signup",Signup );
authRouter.post("/varification",OtpVarification );
authRouter.post("/login",Login );
authRouter.put("/logout",LogoutMiddleware,LogOut );
authRouter.put("/deleteAccount",authenticateToken, DeleteAcount );


export default authRouter