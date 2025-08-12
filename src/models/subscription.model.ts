import { model, Schema } from "mongoose";

interface Subscription {
  _id: string;
  name: string;
  examId: string;
  prizing: { originalPrize: number; oldPeize: number; duration: string }[];
  planTag: string;
  includes: string[];
}
const subscriptionSchema = new Schema<Subscription>(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    examId: {
      type: String,
      required: true,
      ref: "exam",
    },
    prizing: {
      type: [
        {
          originalPrize: {
            type: Number,
            default: 0,
          },
          oldPeize: {
            type: Number,
            default: 0,
          },
          duration: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
    planTag: {
      type: String,
      default: "",
    },
    includes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model<Subscription>("subscription", subscriptionSchema);
