import { model, Schema } from "mongoose";

interface ExamsModel {
  _id: string;
  name: string;
  students: string[];
  chapters: string[];
  tests: string[];
  isDeleted: boolean;
}

const examsSchema = new Schema<ExamsModel>({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  students: {
    type: [String],
    ref: "students",
  },
  chapters: {
    type: [String],
    ref: "chapter",
  },
  tests: {
    type: [String],
    ref: "tests",
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

export default model<ExamsModel>("exams", examsSchema);
