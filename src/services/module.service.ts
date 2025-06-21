import Module from "../models/modules.model";
import { randomUUID } from "crypto";

export class ModuleService {
  public async createModule(data: {
    name: string;
    exam_id: string;
    chapter_Id: string;
    isPro: boolean;
    totalTime: number;
  }) {
    try {
      const module = new Module();
      module._id = `MDLE-${randomUUID()}`;
      module.name = data.name;
      module.exam_id = data.exam_id;
      module.chapter_Id = data.chapter_Id;
      module.isPro = data.isPro;
      module.totalTime = data.totalTime * 60 * 1000;

      const savedModule = await module.save();
      return { status: 200, module: savedModule };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async getAllModulesByChapterId(id: string, studentId: string) {
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
          questionAttempted:
            plainModule.questionAttempted.length > 0
              ? plainModule.questionAttempted
                  .map((qAtt: any) => {
                    const student = qAtt.question_id.attempt.find(
                      (std: any) => std.student_id === qAtt.student_id
                    );
                    if (student.student_id === studentId) {
                      return {
                        _id: qAtt.question_id._id,
                        student_id: student.student_id,
                        option_id: student.option_id,
                      };
                    }
                  })
                  .filter((s) => s)
              : [],
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
    res: { student_id: string; question_id: string },
    pendingTime: number
  ) {
    try {
      // Step 1: Push new question attempt
      await Module.findByIdAndUpdate(id, {
        $push: { questionAttempted: res },
      });

      // Step 2: Check if student_time entry exists
      const module = await Module.findOne({
        _id: id,
        "student_time.student_id": res.student_id,
      });

      if (module) {
        // Student already exists — update totalTime
        await Module.findOneAndUpdate(
          { _id: id, "student_time.student_id": res.student_id },
          {
            $set: {
              "student_time.$.totalTime": pendingTime,
            },
          }
        );
      } else {
        // Student not found — push new student_time record
        await Module.findByIdAndUpdate(id, {
          $push: {
            student_time: {
              student_id: res.student_id,
              totalTime: pendingTime,
            },
          },
        });
      }

      return { status: 200 };
    } catch (error) {
      console.error("Error updating student response:", error);
      return { status: 500, message: error.message };
    }
  }

  public async submitModuleById(moduleId: string, studentId: string) {
    try {
      const module = await Module.findOne({
        _id: moduleId,
        "isCompleted.student_id": studentId,
      });

      if (module) {
        // Find the current isCompleted value
        const studentEntry = module.isCompleted.find(
          (entry) => entry.student_id === studentId
        );

        const newStatus = !studentEntry?.isCompleted; // toggle the value

        // Update the specific student entry's isCompleted value
        const updatedModule = await Module.findOneAndUpdate(
          {
            _id: moduleId,
            "isCompleted.student_id": studentId,
          },
          {
            $set: {
              "isCompleted.$.isCompleted": newStatus,
            },
          },
          { new: true }
        );

        return {
          status: 200,
          message: "Response updated!!",
          module: updatedModule,
        };
      }

      // If student entry does not exist, add with isCompleted: true
      const updatedModule = await Module.findByIdAndUpdate(
        moduleId,
        {
          $push: {
            isCompleted: {
              student_id: studentId,
              isCompleted: true,
            },
          },
        },
        { new: true }
      );

      return {
        status: 200,
        message: "Submitted done!!",
        module: updatedModule,
      };
    } catch (error) {
      console.error("Error in submitModuleById:", error);
      return { status: 500, message: error.message };
    }
  }

  public async removeStudentResponseFromModule(id: string, studentId: string) {
    try {
      const updatedDoc = await Module.findOneAndUpdate(
        { _id: id },
        { $pull: { questionAttempted: { student_id: studentId } } },
        { new: true }
      );

      // Step 2: Check if student_time entry exists
      const module = await Module.findOne({
        _id: id,
        "student_time.student_id": studentId,
      });

      if (module && updatedDoc) {
        // Student already exists — update totalTime
        await Module.findOneAndUpdate(
          { _id: id, "student_time.student_id": studentId },
          {
            $set: {
              "student_time.$.totalTime": updatedDoc.totalTime,
            },
          }
        );
      }

      return { status: 200, message: "Student removed!!" };
    } catch (error) {
      console.error("Error removing student response:", error);
      return { status: 500, message: error.message };
    }
  }
}
