import { model, Schema } from "mongoose";

interface DailyDose {
  _id: string;
  question: string;
  options: {
    name: string;
    answer: boolean;
  }[];
  attempt: {
    student_id: string;
    option_id: string;
  }[];
  correctAns: string;
  exam: string[];
  showAt: Date;
}
const dailyDoseSchema = new Schema<DailyDose>({
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
  correctAns: {
    type: String,
    default: "",
  },
  exam: {
    type: [String],
    default: [],
    ref: "exams",
  },
  showAt: {
    type: Date,
    required: true,
  },
});

export default model<DailyDose>("dailyDose", dailyDoseSchema);
