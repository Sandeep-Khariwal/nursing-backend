import studentModel from "../models/student.model";
import { randomUUID } from "crypto";
import { sendMail } from "../email/CreateEmail";
import { CreateHtmlForOTP } from "../email/CreatehtmlForOTP";
import { generateAccessToken } from "../middleware/jwtToken";
import adminModel from "../models/admin.model";

export class AuthService {
  public async signup(name: string, emailOrPhone: string) {
    try {
      const checkStudent = await studentModel.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      });
      if (checkStudent) {
        return { status: 404, message: "User already exist!!" };
      }
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
      student.dateOfJoining = new Date();
      student.name = name;
      student.lastOtp = otp;
      student.isLogedIn = false;
      student.token = ""
      if (isEmail) {
        student.email = emailOrPhone;
      } else {
        student.phoneNumber = emailOrPhone;
      }

      const savedStudent = await student.save();

      return { status: 200, student: savedStudent, type: "STUD" };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }

  public async varifyOtp(emailOrPhone: string, otp: string) {
    try {
      let isStudent = true;
      //find user email is student or admin
      let user;
      user = await studentModel.findOne({ email: emailOrPhone });

      if (!user) {
        isStudent = false;
        user = await adminModel.findOne({ email: emailOrPhone });
      }

      const token = generateAccessToken({
        _id: user._id,
        email: user.email,
        name: user.name,
      });

      //varify the otp
      if (user.lastOtp === otp) {
        // set isLogedIn
        if (isStudent) {
          await studentModel.findByIdAndUpdate(user._id, { isLogedIn: true , token:token });
        } else {
          await adminModel.findByIdAndUpdate(user._id, { isLogedIn: true , token:token });
        }

        // initialize the empty object
        let newUser ={};

        // assign the value as per type
        if (!isStudent) {
          newUser = {
            ...user,
            userType:"admin"
          }
        } else {
           newUser = {
            ...user,
            userType:"student"
          }
        }

        return {
          status: 200,
          user: newUser,
          message: "OTP varified!!",
          token,
        };
      } else {
        return { status: 404, message: "OTP not varified!!" };
      }
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }

  public async login(emailOrPhone: string) {
    try {
      let isEmail = false;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phonePattern = /^\+?[1-9]\d{1,14}$/;

      let isStudent = true;
      const student = await studentModel.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      });

      const admin = await adminModel.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      });

      // Check if a student was found
      if (!student && !admin) {
        return { status: 404, message: "User not registered!!" };
      } else if (student.isLogedIn) {
        
        return {
          status: 402,
          message: "User already logedin another device!!",
          token:student.token
        };
      } else {
        // check admin is or not
        if (admin) {
          isStudent = false;
        }

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

        if (isStudent) {
          await studentModel.findByIdAndUpdate(student._id, { lastOtp: otp });
        } else {
          await adminModel.findByIdAndUpdate(admin._id, { lastOtp: otp });
        }
        return { status: 200, message: "Check OTP!!" , otp:otp };
      }
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }

  public async logout(id: string, isStudent: boolean) {
    try {
      if (isStudent) {
        await studentModel.findByIdAndUpdate(id, { isLogedIn: false });
      } else {
        await adminModel.findByIdAndUpdate(id, { isLogedIn: false });
      }
      return { status: 200, message: "Logout successfully!!" };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
}
