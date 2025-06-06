import { ExamService } from "../services/exam.service";
import { Request, Response } from "express";

export const CreateNewExam = async (req: Request, res: Response) => {
  const { name } = req.body;

  const exam = new ExamService();
  const response = await exam.createExam(name);

  if (response["status"] === 200) {
    res
      .status(200)
      .json({status:response["status"] , data: response["exam"], message: response["message"] });
  } else {
    res.status(response["status"]).json({status:response["status"] , message: response["message"] });
  }
};

export const GetAllExams = async (req: Request, res: Response) => {
    
  const exam = new ExamService();
  const response = await exam.findAllExams();

  if (response["status"] === 200) {
    res
      .status(200)
      .json({status:response["status"] , data: response["exams"]});
  } else {
    res.status(response["status"]).json({status:response["status"] , message: response["message"] });
  }
};
