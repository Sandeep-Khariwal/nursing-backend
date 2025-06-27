import mongoose, { Schema } from "mongoose";

export interface ResultModal {
    _id:string;
  student_id: string;
  exam_id: string;
  module_id: string;
  chapter_id: string;

  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalTimeSpent: number;
  isCompleted: boolean;

  isDeleted:boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema = new Schema<ResultModal>(
  {
    _id:{
        type:String,
        default:"",
        required:true
    },
    student_id: { type: String, required: true },
    exam_id: { type: String, required: true },
    module_id: { type: String, required: true },
    chapter_id: { type: String, required: true },

    totalQuestions: { type: Number, required: true },
    attemptedQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    accuracy: { type: Number, default:0},
    totalTimeSpent: { type: Number, default:0 },
    isCompleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ResultModel = mongoose.model<ResultModal>("result", ResultSchema);
export default ResultModel;
