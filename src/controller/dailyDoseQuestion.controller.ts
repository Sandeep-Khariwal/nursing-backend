import { DailyDoseService } from "./../services/dailyDoseQuestion";
import { Request, Response } from "express";

export const CreateDailyDoseQuestion = async (req: Request, res: Response) => {
  const { question } = req.body;

  const dailyDoseService = new DailyDoseService();
  const response = await dailyDoseService.createDailyDoseQuestion(question);

  if (response["status"] === 200) {
    return res
      .status(response["status"])
      .json({ message: response["message"] });
  } else {
    return res.status(response["status"]).json(response["message"]);
  }
};
