import Admin from "@models/admin.model";
import { randomUUID } from "crypto";
import { sendMail } from "../email/CreateEmail";
import { CreateHtmlForOTP } from "../email/CreatehtmlForOTP";
import { generateAccessToken } from "src/middleware/jwtToken";

export class AdminService {
  public async createAdmin(props: {
    name: string;
    email: string;
    phone: string;
  }) {
    try {
      const admin = new Admin();
      admin._id = `ADMI-${randomUUID()}`;
      admin.name = props.name;
      admin.email = props.email;
      admin.phoneNumber = props.phone;
      admin.isAdmin = true;

      const savedAdmin = await admin.save();

      return { status: 200, admin: savedAdmin };
    } catch (error) {
      const errorObj = { message: error.message, status: 502 };
      return errorObj;
    }
  }
  
}
