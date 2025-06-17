import express  from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { GetStudent, UpdateStudentExam } from "../controller/student.controller";
const studentRouter = express.Router();

studentRouter.put("/selectExams",authenticateToken,UpdateStudentExam)
studentRouter.get("/:id",authenticateToken,GetStudent)

export default studentRouter