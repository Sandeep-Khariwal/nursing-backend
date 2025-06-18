import { model, Schema } from "mongoose";
interface ModulesModel {
  _id: string;
  name: string;
  exam_id: string;
  chapter_Id: string;
  questions: string[];
  iconImage: string;
  isPro: boolean;
  totalTime: number;
  questionAttempted: {
    student_id: string;
    question_id: string;
    attempted_at?: Date;
  }[];
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
        student_id: { type: String,ref: "student", },
        question_id: { type: String, ref: "question", },
        attempted_at: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});
export default model<ModulesModel>("module", moduleSchema);
