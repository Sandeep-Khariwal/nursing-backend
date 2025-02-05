import { model, Schema } from "mongoose";
interface ModulesModel {
    _id: string;
    name: string;
    examIds:string[]
    subjectId:string;
    questions: string[];
    attemptedQuestions: string[];
    iconImage: string;
    isPro:boolean
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
      examIds: {
        type: [String],
        ref: "exams",
      },
      subjectId: {
        type: String,
        ref: "subjects",
      },
      questions: {
        type: [String],
        ref: "questions",
      },
      attemptedQuestions: {
        type: [String],
        ref: "questions",
      },
      iconImage: {
        type: String,
      },
      isPro: {
        type: Boolean,
        default:false
      },
  });
  export default model<ModulesModel>("modules", moduleSchema);