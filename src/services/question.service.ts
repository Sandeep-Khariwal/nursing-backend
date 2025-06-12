import { randomUUID } from "crypto";
import Question from "../models/question.model";

export class QustionService {
  public async createQuestion(data: {
    question: string;
    module_id: string;
    options: {
      name: string;
      answer: boolean;
    }[];
    correctAns: string;
    explaination: string;
  }) {
    try {
      const question = new Question();
      question._id = `QSTN-${randomUUID()}`;
      question.question = data.question;
      question.module_id = data.module_id;
      question.options = data.options;
      question.correctAns = data.correctAns;
      question.explaination = data.explaination;

      const savedQuestion = await question.save();

      return { status: 200, question: savedQuestion };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async updateById(
    id: string,
    question: {
      question: string;
      module_id: string;
      options: {
        name: string;
        answer: boolean;
      }[];
      correctAns: string;
      explaination: string;
    }
  ) {
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(id, question, {
        new: true,
      });
      return { status: 200, question: updatedQuestion };
    } catch (error) {
      return { status: 200, message: error.message };
    }
  }
  public async getQuestionById(
    id: string) {
    try {
      const question = await Question.findById(id);
      return { status: 200, question: question };
    } catch (error) {
      return { status: 200, message: error.message };
    }
  }
}
