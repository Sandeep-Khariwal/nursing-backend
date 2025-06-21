import { model, Schema } from "mongoose";
interface ModulesModel {
  _id: string;
  name: string;
  exam_id: string;
  chapter_Id: string;
  questions: string[];
  iconImage: string;
  isPro: boolean;

  questionAttempted: {
    student_id: string;
    question_id: string;
    attempted_at?: Date;
  }[];
  totalTime: number;
  isCompleted: { student_id: string; isCompleted: boolean }[];
  student_time: { student_id: string; totalTime: number }[];
}

const moduleSchema = new Schema<ModulesModel>({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  exam_id: {
    type: String,
    ref: "exams",
  },
  chapter_Id: {
    type: String,
    ref: "chapter",
  },
  questions: {
    type: [String],
    ref: "question",
  },
  iconImage: {
    type: String,
  },
  isPro: {
    type: Boolean,
    default: false,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
  questionAttempted: {
    type: [
      {
        _id: false,
        student_id: { type: String, ref: "student" },
        question_id: { type: String, ref: "question" },
        attempted_at: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  isCompleted: {
    type: [
      {
        student_id: {
          type: String,
          default: "",
          ref: "students",
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  },
  student_time: {
    type: [
      {
        student_id: {
          type: String,
          default: "",
          ref: "students",
        },
        totalTime: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [],
  },
});
export default model<ModulesModel>("module", moduleSchema);
