import Admin from "../models/admin.model";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export class AdminService {
  public async createAdmin(props: {
    name: string;
    email: string;
    phone: string;
    password: string;
    countryCode: string;
  }) {
    try {
      const admin = new Admin();
      admin._id = `ADMI-${randomUUID()}`;
      admin.name = props.name;
      admin.email = props.email;
      admin.countryCode = props.countryCode;
      admin.phoneNumber = props.countryCode + props.phone;
      admin.userType = "admin"

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(props.password, saltRounds);
      admin.password = hashedPassword;

      const savedAdmin = await admin.save();

      return { status: 200, admin: savedAdmin };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
}
