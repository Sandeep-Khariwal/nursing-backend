import { model, Schema } from "mongoose";

interface QueryModel {
  _id: string;
  query: string;
  studentId: string;
  reply: string;
  isPublic: boolean;
  isDeleted:boolean
}

const querySchema = new Schema<QueryModel>(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    query: {
      type: String,
      required: true,
      default:""
    },
    studentId: {
      type: String,
      required: true,
      ref: "students",
    },
    reply: {
      type: String,
      default: "",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<QueryModel>("query", querySchema);
