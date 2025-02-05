import { StudentService } from "../services/student.service";
import { Request, Response } from "express";

export const StudentSignup = async (req: Request, res: Response) => {
  const { emailOrPhone } = req.body;
  const studentService = new StudentService();

  const response = await studentService.signupStudent(emailOrPhone);
  if (response["status"] == 200) {
    res.status(200).json({ student: response["student"] });
  } else {
    res.status(response["status"]).json({ message: response["message"] });
  }
};

export const OtpVarification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { otp } = req.body;
  const studentService = new StudentService();

  const response = await studentService.varifyOtpById(id, otp);
  if (response["status"] == 200) {
    res
      .status(200)
      .json({ message: response["message"], token: response["token"] });
  } else {
    res.status(response["status"]).json({ message: response["message"] });
  }
};

export const StudentLogin = async (req: Request, res: Response) => {
  const { emailOrPhone } = req.body;
  const studentService = new StudentService();

  const response = await studentService.loginStudent(emailOrPhone);

  if (response["status"] == 200) {
    res.status(200).json({ message: response["message"] });
  } else {
    res.status(response["status"]).json({ message: response["message"] });
  }
};

export const ResendOtp = async (req: Request, res: Response) => {
  const { emailOrPhone } = req.body;
  const studentService = new StudentService();

  const response = await studentService.loginStudent(emailOrPhone);

  if (response["status"] == 200) {
    res.status(200).json({ message: response["message"] });
  } else {
    res.status(response["status"]).json({ message: response["message"] });
  }
};
