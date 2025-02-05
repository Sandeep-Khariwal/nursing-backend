import { model, Schema } from "mongoose";

interface AdminModel {

}
const adminSchema = new Schema<AdminModel>({

});

export default model<AdminModel>("admins", adminSchema);