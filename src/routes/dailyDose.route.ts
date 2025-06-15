import express from "express";
import {
  AddStudentResponse,
  CreateDailyDoseQuestion,
  GetTodayQuestion,
} from "../controller/dailyDoseQuestion.controller";
import { authenticateToken } from "../middleware/jwtToken";

const dailyDoseRouter = express.Router();

dailyDoseRouter.post("/create", CreateDailyDoseQuestion);
dailyDoseRouter.get("/todayQuestion",authenticateToken, GetTodayQuestion);
dailyDoseRouter.put("/updateStudentResponse/:id", AddStudentResponse);

export default dailyDoseRouter;
