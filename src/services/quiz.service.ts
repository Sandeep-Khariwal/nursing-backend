import { randomUUID } from "crypto";
import Quiz from "../models/quiz.model";
import { AddCloseQuizJob } from "../bullmq/producer";

export class QuizService {
  public async createQuiz(data: {
    name: string;
    examId: string;
    totalTime: number;
    quizFees: number;
    startAt: Date;
    endAt: Date;
    registerStartDate: Date;
    registerEndDate: Date;
  }) {
    try {
      const quiz = new Quiz();
      quiz._id = `QUIZ-${randomUUID()}`;
      quiz.name = data.name;
      quiz.examId = data.examId;
      quiz.totalTime = data.totalTime * 60 * 1000;
      quiz.totalTime = data.quizFees;
      quiz.startAt = data.startAt;
      quiz.endAt = data.endAt;
      quiz.registerStartDate = data.registerStartDate;
      quiz.registerEndDate = data.registerEndDate;

      quiz.isQuizLive = false;
      quiz.isRegistrationOpen = true;
      quiz.isDeleted = false;

      const savedQuiz = await quiz.save();

      return { status: 200, quiz: savedQuiz };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async updateQuizById(
    id: string,
    data: {
      name: string;
      examId: string;
      totalTime: number;
      quizFees: number;
      startAt: Date;
      endAt: Date;
    }
  ) {
    const newData = {
      ...data,
      totalTime: data.totalTime * 60 * 1000,
    };
    try {
      const quiz = await Quiz.findByIdAndUpdate(id, newData, { new: true });
      return { status: 200, quiz, message: "Quiz updated!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async updateStudentResponse(
    id: string,
    res: { studentId: string; questionId: string },
    pendingTime: number
  ) {
    try {
      // Step 1: Check if student_time entry exists
      const quiz = await Quiz.findOne({
        _id: id,
        questionAttempted: {
          $elemMatch: {
            studentId: res.studentId,
            questionId: res.questionId,
          },
        },
      });

      const quiz_for_st = await Quiz.findOne({
        _id: id,
        student_time: {
          $elemMatch: {
            studentId: res.studentId,
          },
        },
      });

      // Step 1: Push new question attempt if entry not present
      if (!quiz) {
        await Quiz.findByIdAndUpdate(id, {
          $push: { questionAttempted: res },
        });
      }
      if (quiz_for_st) {
        // Student already exists — update totalTime
        await Quiz.findOneAndUpdate(
          { _id: id, "student_time.studentId": res.studentId },
          {
            $set: {
              "student_time.$.totalTime": pendingTime,
            },
          }
        );
      } else {
        // Student not found — push new student_time record
        await Quiz.findByIdAndUpdate(id, {
          $push: {
            student_time: {
              studentId: res.studentId,
              totalTime: pendingTime,
            },
          },
        });
      }

      return { status: 200 };
    } catch (error) {
      console.error("Error updating student response:", error);
      return { status: 500, message: error.message };
    }
  }

  public async setQuizLive(quizId: string) {
    try {
      const quiz = await Quiz.findByIdAndUpdate(quizId, {
        $set: { isQuizLive: true },
      });

      if (!quiz) {
        return {
          status: 404,
          message: "Quiz not found!!",
        };
      }

      AddCloseQuizJob({ totalTime: quiz.totalTime, quizId: quizId });

      return { status: 200, message: "Quiz is now live!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async setQuizClose(quizId: string) {
    try {
      const quiz = await Quiz.findByIdAndUpdate(quizId, {
        $set: { isQuizLive: false },
      });

      if (!quiz) {
        return {
          status: 404,
          message: "Quiz not found!!",
        };
      }

      return { status: 200, message: "Quiz is now closed!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async setRegistrationOpen(quizId: string) {
    try {
      const quiz = await Quiz.findByIdAndUpdate(quizId, {
        $set: { isRegistrationOpen: true },
      });

      if (!quiz) {
        return {
          status: 404,
          message: "Quiz not found!!",
        };
      }

      return { status: 200, message: "Registration is now open!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async setRegistrationClose(quizId: string) {
    try {
      const quiz = await Quiz.findByIdAndUpdate(quizId, {
        $set: { isRegistrationOpen: false },
      });

      if (!quiz) {
        return {
          status: 404,
          message: "Quiz not found!!",
        };
      }

      return { status: 200, message: "Registration is now closed!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async getQuiz(examId: string, studentId: string) {
    try {
      let quiz = await Quiz.findOne({
        examId,
        startAt: { $lte: new Date() },
        endAt: { $gte: new Date() },
        registeredStudent: {
          $elemMatch: {
            studentId: studentId,
            isEligible: true,
          },
        },
      });

      if (!quiz) {
        return {
          status: 404,
          message: "Quiz not found!!",
        };
      } else {
        if (!quiz.isQuizLive) {
          quiz = await Quiz.findByIdAndUpdate(quiz._id, {
            $set: { isQuizLive: true },
          });

          // close quizlive after its time
          AddCloseQuizJob({ totalTime: quiz.totalTime, quizId: quiz._id });
        }
      }

      return { status: 200, quiz };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async addNewQuestionInQuiz(id: string, questionId: string) {
    try {
      await Quiz.findByIdAndUpdate(id, {
        $addToSet: { questions: questionId },
      });
      return { status: 200 };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async submitQuizById(quizId: string, studentId: string) {
    try {
      // If student entry does not exist, add with isCompleted: true
      const updatedquiz = await Quiz.findByIdAndUpdate(
        quizId,
        {
          $push: {
            isCompleted: {
              studentId: studentId,
              isCompleted: true,
            },
          },
        },
        { new: true }
      );

      return {
        status: 200,
        message: "Quiz submitted!!",
        quiz: updatedquiz,
      };
    } catch (error) {
      console.error("Error in submitquizById:", error);
      return { status: 500, message: error.message };
    }
  }

  public async updateResultIdInQuiz(
    id: string,
    data: { id: string; studentId: string }
  ) {
    try {
      const quiz = await Quiz.findByIdAndUpdate(
        id,
        {
          $push: { resultId: data },
        },
        { new: true }
      );
      if (!quiz) {
        return { status: 404, message: "quiz not found!!" };
      }
      return { status: 200, quiz, message: "Result updated!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async removeQuizById(id: string) {
    try {
      const quiz = await Quiz.findByIdAndUpdate(
        id,
        {
          $set: { isDeleted: true },
        },
        { new: true }
      );
      if (!quiz) {
        return { status: 404, message: "quiz not found!!" };
      }
      return { status: 200, quiz, message: "quiz removed!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async getAllQuizByExamId(examId?: string) {
    try {
      let quizes;
      if (examId) {
        quizes = await Quiz.find({
          examId,
          isDeleted: false,
        });
      } else {
        quizes = await Quiz.find({
          isDeleted: false,
        });
      }

      if (quizes && quizes.length) {
        return { status: 404, message: "Quizes not found!!" };
      }

      return { status: 200, quizes };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async getQuizById(quizId: string) {
    try {
      const quiz = await Quiz.findById(quizId);

      if (quiz) {
        return { status: 404, message: "Quize not found!!" };
      }

      return { status: 200, quiz };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
