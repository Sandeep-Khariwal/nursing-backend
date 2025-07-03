import express from "express";
import {
  AddStudentResponse,
  CreateDailyDoseQuestion,
  GetTodayQuestion,
} from "../controller/dailyDoseQuestion.controller";
import { authenticateToken } from "../middleware/jwtToken";

const dailyDoseRouter = express.Router();

dailyDoseRouter.post("/create", CreateDailyDoseQuestion);
dailyDoseRouter.get("/todayQuestion/:id",authenticateToken, GetTodayQuestion);
dailyDoseRouter.put("/updateStudentResponse/:id",authenticateToken, AddStudentResponse);

export default dailyDoseRouter;
