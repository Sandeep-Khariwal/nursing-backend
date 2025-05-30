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

  public async adminLogin(emailOrPhone: string){
    try {
      let isEmail = false;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phonePattern = /^\+?[1-9]\d{1,14}$/;

      const admin = await Admin.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      });

      // Check if a student was found
      if (!admin) {
        return { success: 404, message: "User not registered!!" };
      } else {
        let otp = "";

        if (emailPattern.test(emailOrPhone)) {
          isEmail = true;
        } else if (phonePattern.test(emailOrPhone)) {
          isEmail = false;
        }

        if (isEmail) {
          const createOTP = Math.floor(Math.random() * 9000) + 1000;
          otp = createOTP.toString();
        } else {
          otp = "1234";
        }
        if (isEmail) {
          sendMail(
            process.env.MAIL,
            emailOrPhone,
            "Email Varification OTP!",
            CreateHtmlForOTP(otp)
          );
        } else {
          // write logic for send sms on mobile phone
        }
        await Admin.findByIdAndUpdate(admin._id,{lastOtp:otp})
        return { success: 200, admin, message: "Check OTP!!" };
      }
    } catch (error) {
      const errorObj = { message: error.message, status: 502 };
      return errorObj;
    }
  }
    public async varifyOtpById(adminId: string, otp: string) {
      try {
        const admin = await Admin.findById(adminId);
  
        if (admin.lastOtp === otp) {
          const token = generateAccessToken({
            _id: admin._id,
            email: admin.email,
            name:admin.name
          });
  
          return { success: 200, message: "OTP varified!!", token };
        } else {
          return { success: 404, message: "OTP not varified!!" };
        }
      } catch (error) {
        const errorObj = { message: error.message, status: 502 };
        return errorObj;
      }
    }
}
