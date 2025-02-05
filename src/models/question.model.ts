import { model, Schema } from "mongoose";
interface QuestionsModel {
  _id: string;
  question: string;
  options: string[];
  moduleId: string;
  answer: string;
  attemptedStudents: string[];
  explaination: string;
}
const moduleSchema = new Schema<QuestionsModel>({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
  },
  moduleId: {
    type: String,
    ref: "modules",
  },
  attemptedStudents: {
    type: [String],
    ref: "students",
  },
  explaination: {
    type: String,
  },
});
export default model<QuestionsModel>("questions", moduleSchema);
