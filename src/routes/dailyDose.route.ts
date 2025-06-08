import express from "express";
import {
  AddStudentResponse,
  CreateDailyDoseQuestion,
  GetTodayQuestion,
} from "../controller/dailyDoseQuestion.controller";
const dailyDoseRouter = express.Router();

dailyDoseRouter.post("/create", CreateDailyDoseQuestion);
dailyDoseRouter.get("/todayQuestion", GetTodayQuestion);
dailyDoseRouter.put("/updateStudentResponse/:id", AddStudentResponse);

export default dailyDoseRouter;
