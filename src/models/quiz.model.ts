import mongoose, { Schema } from "mongoose";

export interface QuizModal {
  _id: string;
  name: string;
  examId: string;
  chapterId: string;
  questions: string[];
  isRegistrationOpen:boolean

  questionAttempted: {
    studentId: string;
    questionId: string;
    attempted_at?: Date;
  }[];

  totalTime: number;
  isCompleted: { studentId: string; isCompleted: boolean }[];
  registeredStudent: { studentId: string; isEligible: boolean }[];
  student_time: { studentId: string; totalTime: number }[];
  resultId: { id: string; studentId: string }[];

  startAt:Date;
  endAt:Date

  isDeleted: boolean;
}

const quizSchema = new Schema<QuizModal>(
  {
    _id: {
      type: String,
      default: "",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model<QuizModal>("quiz", quizSchema);
export default Quiz;
