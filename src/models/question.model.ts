import { model, Schema } from "mongoose";
interface QuestionsModel {
  _id: string;
  question: string;
  module_id: string;
  options: {
    name: string;
    answer: boolean;
  }[];
  attempt: {
    student_id: string;
    option_id: string;
  }[];
  correctAns: string;
  explaination: string;
  isDeleted:boolean
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
    type: [
      {
        name: {
          type: String,
          default: "",
        },
        answer: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  attempt: {
    type: [
      {
        student_id: {
          type: String,
          default: "",
          ref: "student",
        },
        option_id: {
          type: String,
          default: "",
        },
      },
    ],
  },
  module_id: {
    type: String,
    ref: "modules",
  },
  correctAns: {
    type: String,
    default: "",
  },
  explaination: {
    type: String,
  },
    isDeleted:{
    type:Boolean,
    default:false
  }
});
export default model<QuestionsModel>("question", moduleSchema);
