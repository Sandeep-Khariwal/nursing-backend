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
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }

  public async updateExamById(id: string, name: string) {
    try {
      const exam = await examsModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      return { status: 200, exam, message: "Exam updated!!" };
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }
  public async findAllExams() {
    try {
      const exams = await examsModel.find({isDeleted:false});
      return {
        status: 200,
        exams: exams.map((e) => {
          return { _id: e._id, name: e.name };
        }),
      };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
  public async findNameById(id: string) {
    try {
      const exam = await examsModel.findById(id,{isDeleted:false});
      return exam;
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
  public async addNewChapter(id: string, chapterId: string) {
    try {
      await examsModel.findByIdAndUpdate(id, {
        $addToSet: { chapters: chapterId },
      });
      return { status: 200 };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
    public async removeExamById(id: string) {
      try {
        const exam = await examsModel.findByIdAndUpdate(
          id,
          {
            $set: { isDeleted: true },
          },
          { new: true }
        );
        if (!exam) {
          return { status: 404, message: "Exam not found!!" };
        }
        return { status: 200, exam:exam, message: "Exam removed!!" };
      } catch (error) {
        return { status: 500, message: error.message };
      }
    }
}
