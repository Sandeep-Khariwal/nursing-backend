import { model, Schema } from "mongoose";

interface SubjectModel {
  _id: string;
  name: string;
  modules: string[];
  attemptedModules: string[];
  iconImage: string;
}
const subjectSchema = new Schema<SubjectModel>({
    _id: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      modules: {
        type: [String],
        ref: "modules",
      },
      attemptedModules: {
        type: [String],
        ref: "question",
      },
      iconImage: {
        type: String,
      },
});

export default model<SubjectModel>("subjects", subjectSchema);
