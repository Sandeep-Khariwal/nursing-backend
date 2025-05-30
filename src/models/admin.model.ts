import { model, Schema } from "mongoose";

interface AdminModel {
_id:string;
name:string;
email:string;
phoneNumber:string;
lastOtp:string;
isAdmin:boolean
}
const adminSchema = new Schema<AdminModel>({
    _id: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        default:""
      },
      email: {
        type: String,
        default:""
      },
      phoneNumber: {
        type: String,
        default:""
      },
      lastOtp: {
        type: String,
        default:""
      },
      isAdmin: {
        type: Boolean,
        default:false
      },
});

export default model<AdminModel>("admins", adminSchema);