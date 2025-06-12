import { ChapterService } from "../services/chapter.services";
import { ModuleService } from "../services/module.service";
import { Request, Response } from "express";

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

export const GetAllModules = async (req: Request, res: Response) => {
  const { id } = req.params;
  const moduleService = new ModuleService();

  const response = await moduleService.getAllModulesByChapterId(id);

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
