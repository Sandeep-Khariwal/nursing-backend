import express  from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { UpdateStudentExam } from "../controller/student.controller";
const studentRouter = express.Router();

studentRouter.put("/selectExams",authenticateToken,UpdateStudentExam)

export default studentRouter