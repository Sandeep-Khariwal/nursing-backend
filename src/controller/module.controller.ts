import { clientRequest, toStringParam } from "../middleware/jwtToken";
import { ChapterService } from "../services/chapter.services";
import { ModuleService } from "../services/module.service";
import { Request, Response } from "express";
import { QuestionService } from "../services/question.service";
import { ResultService } from "../services/result.service";
import { StudentService } from "../services/student.service";
import { ModuleType } from "../enums/test.enum";
import { ExamService } from "../services/exam.service";



export const CreateModule = async (req: Request, res: Response) => {
  const { module, moduleId, moduleType } = req.body;

  const moduleService = new ModuleService();
  const chapterService = new ChapterService();
  const examService = new ExamService();

  let response;
  if (moduleId) {
    response = await moduleService.updateModuleById(moduleId, module);
  } else {
    response = await moduleService.createModule(module);
  }

  if (response["status"] === 200) {
    // update module in chapter
    if (!moduleId) {
      if (ModuleType.QUESTION_FIELD === moduleType) {
        console.log(" response[module]._id ", response["module"]._id);
        await chapterService.addNewModuleInChapter(
          module.chapterId,
          response["module"]._id
        );
      } else if (ModuleType.MINI_TEST === moduleType) {
        // add modules in exam mini_test_modiles
        await examService.addMiniTestModules(
          module.examId,
          response["module"]._id
        );
      } else {
        // add modules in exam mock_drills_modiles
        await examService.addMockDrillsModules(
          module.examId,
          response["module"]._id
        );
      }
    }
    res.status(response["status"]).json({
      status: 200,
      data: { module: response["module"] },
      message: response["message"],
    });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

export const GetAllModules = async (req: clientRequest, res: Response) => {
  const chapterId = toStringParam(req.query.chapterId);
  const moduleType = toStringParam(req.query.moduleType);
  const examId = toStringParam(req.query.examId);

  const studentId = req.user._id;
  const moduleService = new ModuleService();
  const examService = new ExamService();

  let response;
  let modules = [];
  if (chapterId || ModuleType.QUESTION_FIELD === moduleType) {
    response = await moduleService.getAllModulesByChapterId(
      chapterId,
      studentId
    );
    modules = response["modules"];
  } else if (examId) {
    if (ModuleType.MINI_TEST === moduleType) {
      response = await examService.getAllMiniTestModulesFromExam(
        examId,
        studentId
      );
      if (response["status"] === 200) {
        modules = response["modules"];
      }
    } else {
      response = await examService.getAllMockDrillModulesFromExam(
        examId,
        studentId
      );
      if (response["status"] === 200) {
        modules = response["modules"];
      }
    }
  } else {
    response = await moduleService.getAllModules(studentId);
    modules = response["modules"];
  }

  if (response["status"] === 200) {
    res
      .status(response["status"])
      .json({ status: 200, data: { modules: modules } });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

export const GetAllQuetionFieldModules = async (
  req: clientRequest,
  res: Response
) => {
  const { id } = req.params;
  const studentId = req.user._id;
  const moduleService = new ModuleService();

  const response = await moduleService.getAllModulesByChapterId(
    id,
    studentId
  );

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
    // const module = response["module"].toObject();

    // const totalTime =
    //   module.student_time.length > 0
    //     ? module.student_time.filter((c) => c.studentId === _id)[0]?.totalTime
    //     : 0;

    // const isCompleted =
    //   module.isCompleted.length > 0
    //     ? module.isCompleted.filter((c) => c.studentId === _id)[0]?.isCompleted
    //     : 0;

    // const newModule = {
    //   ...module,
    //   isCompleted: isCompleted?isCompleted:false,
    //   student_time: totalTime?totalTime:0,
    // };

    res.status(200).json({
      status: 200,
      message: response["message"],
    });
  } else {
    res.status(response["status"]).json(response["message"]);
  }
};

export const RestoreModules = async (req: Request, res: Response) => {
  const { id } = req.params;

  const questionService = new QuestionService();
  const moduleService = new ModuleService();
  const response = await moduleService.restoreModule(id);
  await questionService.restoreManyQuestionByModuleId([id]);

  if (response["status"] === 200) {
    res
      .status(response["status"])
      .json({ status: 200, message: response["message"] });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

export const ReAppearModule = async (req: clientRequest, res: Response) => {
  const { id } = req.params;
  const { _id } = req.user;

  const moduleService = new ModuleService();
  const questionService = new QuestionService();
  const resultService = new ResultService();
  const studentService = new StudentService();

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

    //find result and remove from student profile
    const resultResp = await resultService.getResultByStudentAndModule(_id, id);
    if (resultResp["status"] === 200) {
      await studentService.removeResultFromStudent(_id, resultResp["resultId"]);
    } else {
      res.status(resultResp["status"]).json(resultResp["message"]);
    }
    if (response2["status"] === 200) {
      // update isCompleted false in module for a student
      const response3 = await moduleService.submitModuleById(id, _id);
      if (response3["status"] === 200) {
        const module = response3["module"].toObject();

        const student_time = module.student_time.filter(
          (c) => c.studentId === _id
        )[0]?.totalTime;

        const newModule = {
          ...module,
          questionAttempted: [],
          isCompleted: module.isCompleted.filter((c) => c.studentId === _id)[0]
            .isCompleted,
          student_time: student_time ?? 0,
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

export const RemoveModule = async (req: clientRequest, res: Response) => {
  const { id } = req.params;
  const moduleService = new ModuleService();
  const questionService = new QuestionService();

  const response = await moduleService.removeModuleById(id);

  if (response["status"] === 200) {
    await questionService.removeManyQuestionByModuleId([id]);

    res
      .status(response["status"])
      .json({ status: 200, message: response["message"] });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
