import express from "express";
import { CreateNewExam, GetAllExams } from "../controller/exam.controller";
import { authenticateToken } from "../middleware/jwtToken";

const examRouter = express.Router();

// all post routes
examRouter.post("/create", CreateNewExam);

// all get routes
examRouter.get("/", authenticateToken ,GetAllExams);

export default examRouter;
