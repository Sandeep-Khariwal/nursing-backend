import express from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { CreateQuestion, GetQuestion, UpdateQuestion } from "../controller/question.controller";
const questionRouter = express.Router();

questionRouter.post("/create",CreateQuestion)
questionRouter.put("/update/:id",UpdateQuestion)
questionRouter.get("/get/:id", authenticateToken , GetQuestion)

export default questionRouter;