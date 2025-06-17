import express from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { CreateQuestion, GetQuestion, UpdateQuestion, UpdateStudentResponse } from "../controller/question.controller";
const questionRouter = express.Router();

questionRouter.post("/create",CreateQuestion)
questionRouter.put("/update/:id",authenticateToken,UpdateQuestion)
questionRouter.put("/updateStudentResponse/:id",authenticateToken,UpdateStudentResponse)
questionRouter.get("/get/:id", authenticateToken , GetQuestion)

export default questionRouter;