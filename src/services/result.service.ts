import { randomUUID } from "crypto";
import Result from "../models/result.model";

export class ResultService {
  public async createResult(data: {
    studentId: string;
    examId: string;
    moduleId: string;
    chapterId: string;

    totalQuestions: number;
    attemptedQuestions: number;
    correctAnswers: number;
    accuracy?: number;
    totalTimeSpent?: number;
    isCompleted: boolean;
    questionIds:string[]
  }) {
    try {
      const result = new Result();
      result._id = `RSLT-${randomUUID()}`;
      result.studentId = data.studentId;
      result.examId = data.examId;
      result.moduleId = data.moduleId;
      result.chapterId = data.chapterId;
      result.totalQuestions = data.totalQuestions;
      result.attemptedQuestions = data.attemptedQuestions;
      result.correctAnswers = data.correctAnswers;
      result.isCompleted = data.isCompleted;
      result.Questions = data.questionIds
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
        studentId: studentId,
        moduleId: moduleId,
      });

      if (!result) {
        return { status: 404, message: "Already re-appeared!!" };
      }

      return { status: 200, resultId: result._id };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async getResultById(id: string) {
    try {
      const result = await Result.findById(id);
      if (!result) {
        return { status: 404, message: "Result not found!!" };
      }
      return { status: 200, result };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
