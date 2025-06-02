import { randomUUID } from "crypto";
import examsModel from "../models/exams.model";

export class ExamService {
  public async createExam(name: string) {
    try {
      const exam = new examsModel();

      exam._id = `EXAM-${randomUUID()}`;
      exam.name = name;
      const savedExam = await exam.save();
      return { status: 200, exam: savedExam, message: "Exam created!!" };
    } catch (error) {
      const errorObj = { message: error.message, status: 412 };
      return errorObj;
    }
  }
  public async findAllExams() {
    try {
       const exams = await examsModel.find({})
      return { status: 200, exams: exams.map((e)=>{return{_id:e._id,name:e.name}}) };
    } catch (error) {
      const errorObj = { message: error.message, status: 412 };
      return errorObj;
    }
  }
}
