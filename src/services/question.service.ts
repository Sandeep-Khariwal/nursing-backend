import { randomUUID } from "crypto";
import Question from "../models/question.model";

export class QuestionService {
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

      return { status: 200, question: savedQuestion , message:"Question created!!" };
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
      return { status: 200, question: updatedQuestion , message:"Question updated!!" };
    } catch (error) {
      return { status: 200, message: error.message };
    }
  }
  public async updateStudentResponseById(
    id: string,
    student: {
      student_id: string;
      option_id: string;
    }
  ) {
    try {
      const question = await Question.findById(id);

      if (!question) {
        return { status: 404, message: "Question not found!!" };
      }
      const alreadyAttempted = question.attempt.some(
        (attempt) => attempt.student_id === student.student_id
      );

      if (alreadyAttempted) {
        return { status: 400, message: "Already attempted!!" };
      }

      question.attempt.push(student);
      await question.save();

      return { status: 200, question };
    } catch (error) {
      return { status: 200, message: error.message };
    }
  }
  public async getQuestionById(id: string) {
    try {
      const question = await Question.findById(id);
      return { status: 200, question: question };
    } catch (error) {
      return { status: 200, message: error.message };
    }
  }
  public async removeStudentResponseFromQuestion(
    moduleId: string,
    studentId: string
  ) {
    try {
      // Step 1: Find all questions belonging to the module
      const questions = await Question.find({ module_id: moduleId });

      // Step 2: Remove student attempt from each question
        const updatePromises = questions.map((question) =>
      Question.findByIdAndUpdate(
        question._id,
        {
          $pull: {
            attempt: { student_id: studentId },
          },
        },
        { new: true }
      )
    );

      const updatedQuestions = await Promise.all(updatePromises);
      return { status: 200, updatedQuestions };
    } catch (error) {
      console.error("Error removing student attempts:", error);
      return { status: 500, message: error.message };
    }
  }
}
