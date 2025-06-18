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
      const modules = await Module.find({ chapter_Id: id }).populate([
        {
          path: "questions",
          select: ["_id", "options"],
        },
        {
          path: "questionAttempted.question_id", // Populate nested question_id
          select: ["_id", "attempt"],
        },
      ]);

      const result = modules.map((module) => {
        const plainModule = module.toObject(); // This avoids the _doc error

        return {
          ...plainModule,
          questions: plainModule.questions.map((q: any) => {
            const correctOption = q.options.find(
              (opt: any) => opt.answer === true
            );
            return {
              _id: q._id,
              option_id: correctOption ? correctOption._id : null,
            };
          }),
          questionAttempted: plainModule.questionAttempted.length > 0 ?plainModule.questionAttempted.map(
            (qAtt: any) => {
             
                const student = qAtt.question_id.attempt.find(
              (std: any) => std.student_id === qAtt.student_id
            );
             return {
              _id:qAtt.question_id._id,
              student_id:qAtt.student_id,
              option_id:student.option_id
             }
            }
          ):[],
        };
      });

      return { status: 200, modules: result };
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
  public async updateStudentResponse(
    id: string,
    res: { student_id: string; question_id: string }
  ) {
    try {
      await Module.findByIdAndUpdate(id, {
        $push: { questionAttempted: res },
      });
      return { status: 200 };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
