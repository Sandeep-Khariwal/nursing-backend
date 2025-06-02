import { clientRequest } from "../middleware/jwtToken";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export const Signup = async (req: Request, res: Response) => {
  const { name, emailOrPhone } = req.body;
  const authService = new AuthService();

  const response = await authService.signup(name, emailOrPhone);
  if (response["status"] == 200) {
    res
      .status(200)
      .json({ status: response["status"], student: response["student"] });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

export const OtpVarification = async (req: Request, res: Response) => {
  const { otp, emailOrPhone } = req.body;
  const authService = new AuthService();

  const response = await authService.varifyOtp(emailOrPhone, otp);
  if (response["status"] == 200) {
    res
      .status(200)
      .json({
        status: response["status"],
        message: response["message"],
        user: response["user"],
        token: response["token"],
      });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

export const Login = async (req: Request, res: Response) => {
  const { emailOrPhone } = req.body;
  const authService = new AuthService();

  const response = await authService.login(emailOrPhone);

  if (response["status"] == 200) {
    res
      .status(200)
      .json({ status: response["status"], message: response["message"] });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const LogOut = async (req: clientRequest, res: Response) => {
  const { _id } = req.user;
  const isStudent = _id.startsWith("STUD");
  const authService = new AuthService();
   
  const response = await authService.logout(_id, isStudent);

  if (response["status"] == 200) {
    res
      .status(200)
      .json({ status: response["status"], message: response["message"] });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

// export const ResendOtp = async (req: Request, res: Response) => {
//   const { emailOrPhone } = req.body;
//   const studentService = new StudentService();

//   const response = await studentService.loginStudent(emailOrPhone);

//   if (response["status"] == 200) {
//     res.status(200).json({ message: response["message"] });
//   } else {
//     res.status(response["status"]).json({ message: response["message"] });
//   }
// };
