import Module from "../models/modules.model";
import { randomUUID } from "crypto";

export class ModuleService {
  public async createModule(data: {
    name: string;
    exam_id: string;
    chapter_Id: string;
    isPro: boolean;
  }) {
    try {
      const module = new Module();
      module._id = `MDLE-${randomUUID()}`;
      module.name = data.name;
      module.exam_id = data.exam_id;
      module.chapter_Id = data.chapter_Id;
      module.isPro = data.isPro;

      const savedModule = await module.save();
      return { status: 200, module: savedModule };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async getAllModulesByChapterId(id: string) {
    try {
      const modules = await Module.find({ chapter_Id: id });
      return { status: 200, modules: modules };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async addNewQuestionInModal(id: string, questionId: string) {
    try {
      await Module.findByIdAndUpdate(id, {
        $addToSet: { questions: questionId },
      });
      return { status: 200 };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
