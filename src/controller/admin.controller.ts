import { AdminService } from "../services/admin.service";
import { Request, Response } from "express";

export const OtpVarification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { otp } = req.body;
  const adminService = new AdminService();

  const response = await adminService.varifyOtpById(id, otp);
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
  const studentService = new AdminService();

  const response = await adminService.login(emailOrPhone);

  if (response["status"] == 200) {
    res.status(200).json({ message: response["message"] });
  } else {
    res.status(response["status"]).json({ message: response["message"] });
  }
};

export const ResendOtp = async (req: Request, res: Response) => {
  const { emailOrPhone } = req.body;
  const studentService = new AdminService();

  const response = await studentService.loginStudent(emailOrPhone);

  if (response["status"] == 200) {
    res.status(200).json({ message: response["message"] });
  } else {
    res.status(response["status"]).json({ message: response["message"] });
  }
};