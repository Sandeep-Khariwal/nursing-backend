import { ModuleService } from "../services/module.service";
import { QustionService } from "../services/question.service";
import { Request, Response } from "express";

export const CreateQuestion = async (req: Request, res: Response) => {
  const { question } = req.body;

  const questionService = new QustionService();
  const moduleService = new ModuleService();
  const response = await questionService.createQuestion(question);

  if (response["status"] === 200) {
    // update Question in module
    await moduleService.addNewQuestionInModal(
      question.module_id,
      response["question"]._id
    );
    res
      .status(response["status"])
      .json({ status: 200, data: { question: response["question"] } });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const UpdateQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { question } = req.body;

  const questionService = new QustionService();
  //update response in question
  const response = await questionService.updateById(id, question);

  if (response["status"] === 200) {

    res
      .status(response["status"])
      .json({ status: 200, data: { question: response["question"] } });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const UpdateStudentResponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { student } = req.body;

  const questionService = new QustionService();
    const moduleService = new ModuleService();
  const response = await questionService.updateStudentResponseById(id, student);

  if (response["status"] === 200) {
      const resp = {
      student_id: student.student_id,
      question_id: id,
    };
    await moduleService.updateStudentResponse(
      response["question"].module_id,
      resp
    );
    res
      .status(response["status"])
      .json({ status: 200, data: { question: response["question"] } });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const GetQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;

  const questionService = new QustionService();
  const response = await questionService.getQuestionById(id);

  if (response["status"] === 200) {
    res
      .status(response["status"])
      .json({ status: 200, data: { question: response["question"] } });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
