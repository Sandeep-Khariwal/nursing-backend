import { clientRequest } from "src/middleware/jwtToken";
import { ChapterService } from "../services/chapter.services";
import { ModuleService } from "../services/module.service";
import { Request, Response } from "express";
import { QuestionService } from "../services/question.service";

export const CreateModule = async (req: Request, res: Response) => {
  const { module } = req.body;

  const moduleService = new ModuleService();
  const chapterService = new ChapterService();
  const response = await moduleService.createModule(module);

  if (response["status"] === 200) {
    // update module in chapter
    await chapterService.addNewModuleInChapter(
      module.chapter_Id,
      response["module"]._id
    );
    res
      .status(response["status"])
      .json({ status: 200, data: { module: response["module"] } });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

export const GetAllModules = async (req: clientRequest, res: Response) => {
  const { id } = req.params;
  const studentId = req.user._id;
  const moduleService = new ModuleService();

  const response = await moduleService.getAllModulesByChapterId(id, studentId);

  if (response["status"] === 200) {
    res
      .status(response["status"])
      .json({ status: 200, data: { modules: response["modules"] } });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

export const SubmitModuleResponse = async (
  req: clientRequest,
  res: Response
) => {
  const { id } = req.params;
  const { _id } = req.user;

  const moduleService = new ModuleService();

  const response = await moduleService.submitModuleById(id, _id);

  if (response["status"] === 200) {
    const module = response["module"].toObject();
    const newModule = {
      ...module,
      isCompleted: module.isCompleted.filter((c) => c.student_id === _id)[0]
        .isCompleted,
      student_time: module.student_time.filter((c) => c.student_id === _id)[0]
        .totalTime,
    };

    res.status(200).json({
      status: 200,
      data: newModule,
    });
  } else {
    res.status(response["status"]).json(response["message"]);
  }
};

export const ReAppearModule = async (req: clientRequest, res: Response) => {
  const { id } = req.params;
  const { _id } = req.user;

  const moduleService = new ModuleService();
  const questionService = new QuestionService();

  // pull student response from modules attempt

  const response1 = await moduleService.removeStudentResponseFromModule(
    id,
    _id
  );
  if (response1["status"] === 200) {
    // remove student response from questions
    const response2 = await questionService.removeStudentResponseFromQuestion(
      id,
      _id
    );
    if (response2["status"] === 200) {
      // update isCompleted false in module for a student
      const response3 = await moduleService.submitModuleById(id, _id);
      if (response3["status"] === 200) {
        const module = response3["module"].toObject();

        const newModule = {
          ...module,
          isCompleted: module.isCompleted.filter((c) => c.student_id === _id)[0]
            .isCompleted,
        };

        res.status(200).json({
          status: 200,
          data: newModule,
        });
      } else {
        res.status(response3["status"]).json(response3["message"]);
      }
    } else {
      res.status(response2["status"]).json(response2["message"]);
    }
  } else {
    res.status(response1["status"]).json(response1["message"]);
  }
};
