import mongoose, { Schema } from "mongoose";

export interface ResultModal {
    _id:string;
  studentId: string;
  examId: string;
  moduleId: string;
  chapterId: string;

  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalTimeSpent: number;
  isCompleted: boolean;
  Questions:string[]

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
    studentId: { type: String, required: true },
    examId: { type: String, required: true },
    moduleId: { type: String, required: true },
    chapterId: { type: String, required: true },
    Questions: { type: [String], default:[] },

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
