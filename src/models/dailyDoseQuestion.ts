import { model, Schema } from "mongoose";

interface DailyDose {
  _id: string;
  question: string;
  options: {
    name: string;
    answer: boolean;
  }[];
  attempt: {
    _id: string;
    option_id: string;
  }[];
  correctAns: string;
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
        _id: {
          type: String,
          default: "",
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
});

export default model<DailyDose>("dailyDose", dailyDoseSchema);
