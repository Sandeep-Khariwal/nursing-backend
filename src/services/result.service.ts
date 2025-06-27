import { randomUUID } from "crypto";
import Result from "../models/result.model";

export class ResultService {
  public async createResult(data: {
    student_id: string;
    exam_id: string;
    module_id: string;
    chapter_id: string;

    totalQuestions: number;
    attemptedQuestions: number;
    correctAnswers: number;
    accuracy?: number;
    totalTimeSpent?: number;
    isCompleted: boolean;
  }) {
    try {
      const result = new Result();
      result._id = `RSLT-${randomUUID()}`;
      result.student_id = data.student_id;
      result.exam_id = data.exam_id;
      result.module_id = data.module_id;
      result.chapter_id = data.chapter_id;
      result.totalQuestions = data.totalQuestions;
      result.attemptedQuestions = data.attemptedQuestions;
      result.correctAnswers = data.correctAnswers;
      result.isCompleted = data.isCompleted;
      if (data.accuracy) {
        result.accuracy = data.accuracy;
      }
      if (data.totalTimeSpent) {
        result.totalTimeSpent = data.totalTimeSpent;
      }

      const savedResult = await result.save();
      return { status: 200, result: savedResult, message: "Result created!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async getResultByStudentAndModule(
    studentId: string,
    moduleId: string
  ) {
    try {
      const result = await Result.findOne({
        student_id: studentId,
        module_id: moduleId,
      });

      return { status: 200, resultId: result._id };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
