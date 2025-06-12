import { model, Schema } from "mongoose";
interface ModulesModel {
  _id: string;
  name: string;
  exam_id: string;
  chapter_Id: string;
  questions: string[];
  iconImage: string;
  isPro: boolean;
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
});
export default model<ModulesModel>("module", moduleSchema);
