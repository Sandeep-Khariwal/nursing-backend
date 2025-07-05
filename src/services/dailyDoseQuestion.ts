import DailyDoseQuestion from "../models/dailyDoseQuestion";
import { randomUUID } from "crypto";

export class DailyDoseService {
  public async createDailyDoseQuestion(
    data: {
      question: string;
      options: {
        name: string;
        answer: boolean;
      }[];
      correctAns: string;
      showAt: string;
    },
    examId: string,
    dailyDoseWisdom: string
  ) {
    try {
      const dailyDose = new DailyDoseQuestion();
      dailyDose._id = `DDQP-${randomUUID()}`;
      dailyDose.question = data.question;
      dailyDose.options = data.options;
      dailyDose.correctAns = data.correctAns;
      dailyDose.showAt = new Date(data.showAt);
      dailyDose.examId = examId;
      dailyDose.dailyDoseWisdom = dailyDoseWisdom;

      await dailyDose.save();

      return { status: 200, message: "question created" };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
  public async getTodayQuestion(examId:string) {
    const today = new Date();
    const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999));

    try {
      const question = await DailyDoseQuestion.findOne({
        examId:examId,
        showAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      return { status: 200, question };
    } catch (error: any) {
      return { message: error.message, status: 500 };
    }
  }

  public async updateStudentResponse(
    id: string,
    student: { studentId: string; option_id: string }
  ) {
    try {
      const question = await DailyDoseQuestion.findById(id);

      if (!question) {
        return { status: 404, message: "Question not found!!" };
      }
      const alreadyAttempted = question.attempt.some(
        (attempt) => attempt.studentId === student.studentId
      );

      if (alreadyAttempted) {
        return { status: 400, message: "Already attempted." };
      }

      question.attempt.push(student);
      await question.save();

      return { status: 200, question };
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }
}
