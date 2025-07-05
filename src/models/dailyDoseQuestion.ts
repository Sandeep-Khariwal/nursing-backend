import { model, Schema } from "mongoose";

interface DailyDose {
  _id: string;
  question: string;
  options: {
    name: string;
    answer: boolean;
  }[];
  attempt: {
    studentId: string;
    option_id: string;
  }[];
  correctAns: string;
  examId: string;
  dailyDoseWisdom: string;
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
        studentId: {
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
  dailyDoseWisdom: {
    type: String,
    default: "",
  },
  examId: {
    type: String,
    ref: "exams",
  },
  showAt: {
    type: Date,
    required: true,
  },
});

export default model<DailyDose>("dailyDose", dailyDoseSchema);
