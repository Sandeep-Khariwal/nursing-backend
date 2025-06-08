import { Request, Response } from "express";
import { clientRequest } from "../middleware/jwtToken";
import { StudentService } from "../services/student.service";

export const UpdateStudentExam = async (req: clientRequest, res: Response) => {
  const { _id } = req.user;
  const { exams } = req.body;
  const studentService = new StudentService();

  const response = await studentService.updateStudentExamsById(_id, exams);
  if (response["status"] == 200) {
    res
      .status(200)
      .json({
        status: response["status"],
        data: response["selectedExam"],
        message: response["message"],
      });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
