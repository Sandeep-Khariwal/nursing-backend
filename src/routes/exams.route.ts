import express from "express";
import { CreateNewExam, GetAllExams } from "../controller/exam.controller";

const examRouter = express.Router();

// all post routes
examRouter.post("/create", CreateNewExam);

// all get routes
examRouter.get("/", GetAllExams);

export default examRouter;
