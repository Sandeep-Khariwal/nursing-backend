import studentModel from "../models/student.model";
import { randomUUID } from "crypto";
import { sendMail } from "../email/CreateEmail";
import { CreateHtmlForOTP } from "../email/CreatehtmlForOTP";
import { generateAccessToken } from "../middleware/jwtToken";

export class StudentService {
  public async signupStudent(emailOrPhone: string) {
    try {
      let otp = "";
      let isEmail = false;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phonePattern = /^\+?[1-9]\d{1,14}$/;

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

      const student = new studentModel();
      student._id = `STUD-${randomUUID()}`;
      student.dateOfJoining = new Date()
      student.lastOtp = otp;
      if (isEmail) {
        student.email = emailOrPhone;
      } else {
        student.phoneNumber = emailOrPhone;
      }

      const savedStudent = await student.save();

      return { success: 200, student: savedStudent };
    } catch (error) {
      const errorObj = { message: error.message, status: 502 };
      return errorObj;
    }
  }

  public async varifyOtpById(studentId: string, otp: string) {
    try {
      const student = await studentModel.findById(studentId);

      if (student.lastOtp === otp) {
        const token = generateAccessToken({
          _id: student._id,
          email: student.email,
          phone: student.phoneNumber,
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

  public async loginStudent(emailOrPhone: string) {
    try {
      let isEmail = false;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phonePattern = /^\+?[1-9]\d{1,14}$/;

      const student = await studentModel.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      });

      // Check if a student was found
      if (!student) {
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
        await studentModel.findByIdAndUpdate(student._id,{lastOtp:otp})
        return { success: 200, message: "Check OTP!!" };
      }
    } catch (error) {
      const errorObj = { message: error.message, status: 502 };
      return errorObj;
    }
  }
}
