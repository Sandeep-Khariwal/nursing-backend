import express from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { CreateQuestion, GetQuestion, RemoveQuestion, UpdateStudentResponse } from "../controller/question.controller";
const questionRouter = express.Router();

questionRouter.post("/create",CreateQuestion)
questionRouter.put("/updateStudentResponse/:id",authenticateToken,UpdateStudentResponse)
questionRouter.put("/removeQuestion/:id",authenticateToken,RemoveQuestion)
questionRouter.get("/get/:id", authenticateToken , GetQuestion)

export default questionRouter;