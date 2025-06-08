import { StudentService } from "../services/student.service";
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
      .json({ status: response["status"], data: response["student"] });
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
    res.status(200).json({
      status: response["status"],
      message: response["message"],
      data: response["user"],
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

  if (response["status"] === 200) {
    res
      .status(200)
      .json({ status: response["status"], message: response["message"] });
  } else if (response["status"] === 402) {
    res
      .status(response["status"])
      .json({ status: response["status"], token: response["token"] });
  } else {
    res.status(response["status"]).json({
      status: response["status"],
      data: response["otp"],
      message: response["message"],
    });
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

export const DeleteAcount = async (req: clientRequest, res: Response) => {
  const { _id } = req.user;
  
  const studentService = new StudentService();

  const response = await studentService.deleteAccount(_id);

  if (response["status"] == 200) {
    res
      .status(200)
      .json({ status: response["status"], message: response["message"] });
  } else {
    res.status(response["status"]).json({ message: response["message"] });
  }
};
