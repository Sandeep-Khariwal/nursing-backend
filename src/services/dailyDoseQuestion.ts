import DailyDoseQuestion from "@models/dailyDoseQuestion";
import { randomUUID } from "crypto";

export class DailyDoseService {
  public async createDailyDoseQuestion(data: {
    question: string;
    options: {
    name: string;
    answer: boolean;
  }[];
    correctAns: string;
  }) {
    try {
      const dailyDose = new DailyDoseQuestion();
      dailyDose._id = `DDQP-${randomUUID()}`;
      dailyDose.question = data.question;
      dailyDose.options = data.options
      dailyDose.correctAns = data.correctAns

      await dailyDose.save()

      return {status:200,message:"question created"}
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
}
