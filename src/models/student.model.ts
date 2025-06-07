import { model, Schema } from "mongoose";

interface StudentModel {
  _id: string;
  name: string;
  phoneNumber: string;
  profilePic: string;
  exams: { _id: string; is_primary: boolean }[];
  parentNumber: string;
  email: string;
  dateOfBirth: Date;
  dateOfJoining: Date;
  address: string;
  isLogedIn: boolean;

  testAnswers: { testId: string; answerSheetId: string }[];
  studentResults: string[];
  createdAt: Date;
  isDeleted: boolean;
  paymentRecords: string[];

  lastOtp: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  subscriptionType: string;
  featureAccess: {
    pro: boolean;
  };
  token: string;
}

const studentSchema = new Schema<StudentModel>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
  exams: {
    type: [
      {
        _id: {
          type: String,
          default: "",
          ref:"exams"
        },
        is_primary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    required: false,
    default: [],
    ref: "exams",
  },
  parentNumber: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: new Date(),
  },
  address: {
    type: String,
    default: "",
  },
  testAnswers: {
    type: [
      {
        testId: { type: String, ref: "Test", required: true },
        answerSheetId: { type: String, ref: "AnswerSheet", required: true },
      },
    ],
    default: [],
  },
  studentResults: {
    type: [String],
    default: [],
    ref: "StudentResult",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isLogedIn: {
    type: Boolean,
    default: false,
  },
  paymentRecords: {
    type: [String],
    default: [],
    ref: "StudentPaymentRecord",
  },
  lastOtp: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: false,
  },
  subscriptionType: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now(),
  },
  featureAccess: {
    pro: {
      type: Boolean,
      default: false,
    },
  },
});

export default model<StudentModel>("students", studentSchema);
