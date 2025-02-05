import { model, Schema } from "mongoose";

interface StudentModel {
  _id: string;
  name: string;
  phoneNumber: string;
  profilePic: string;
  batchId: string[];
  parentNumber: string;
  dateOfBirth: Date;
  dateOfJoining: Date;
  address: string;
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
  email: string;
  subscriptionType: string;
  featureAccess: {
    pro: boolean;
  };
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
  batchId: {
    type: [String],
    required: false,
    default: [],
    ref: "Batch",
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
