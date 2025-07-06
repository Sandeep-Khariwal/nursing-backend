import { DailyDoseService } from "./../services/dailyDoseQuestion";
import { Request, Response } from "express";

export const CreateDailyDoseQuestion = async (req: Request, res: Response) => {
  const { question, examId, dailyDoseWisdom } = req.body;

  const dailyDoseService = new DailyDoseService();
  const response = await dailyDoseService.createDailyDoseQuestion(
    question,
    examId,
    dailyDoseWisdom
  );

  if (response["status"] === 200) {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const GetTodayQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dailyDoseService = new DailyDoseService();
  const response = await dailyDoseService.getTodayQuestion(id);

  if (response["status"] === 200) {
    res.status(response["status"]).json({
      status: response["status"],
      data: { question: response["question"] },
    });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const GetAllDailyDoseQuestion = async (req: Request, res: Response) => {
  const dailyDoseService = new DailyDoseService();

  const response = await dailyDoseService.getAllDailyDoseQuestion();

  if (response["status"] === 200) {
    res.status(response["status"]).json({
      status: response["status"],
      data: { questions: response["questions"] },
    });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const AddStudentResponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { student } = req.body;

  const dailyDoseService = new DailyDoseService();
  const response = await dailyDoseService.updateStudentResponse(id, student);

  if (response["status"] === 200) {
    res.status(response["status"]).json({
      status: response["status"],
      data: { question: response["question"] },
    });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const RemoveDailyDose = async (req: Request, res: Response) => {
  const { id } = req.params;

  const dailyDoseService = new DailyDoseService();
  const response = await dailyDoseService.removeDailyDoseById(id);

  if (response["status"] === 200) {
    res.status(response["status"]).json({
      status: response["status"],
      message: response["message"],
    });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
}
