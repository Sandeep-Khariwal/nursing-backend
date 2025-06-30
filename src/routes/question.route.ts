import express from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { CreateQuestion, GetQuestion, UpdateStudentResponse } from "../controller/question.controller";
const questionRouter = express.Router();

questionRouter.post("/create",CreateQuestion)
questionRouter.put("/updateStudentResponse/:id",authenticateToken,UpdateStudentResponse)
questionRouter.get("/get/:id", authenticateToken , GetQuestion)

export default questionRouter;