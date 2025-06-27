import mongoose from "mongoose";
import { Request, Response } from "express";
import { clientRequest } from "../middleware/jwtToken";
import { ModuleService } from "../services/module.service";
import { ResultService } from "../services/result.service";
import { QuestionService } from "../services/question.service";
import { StudentService } from "../services/student.service";

export const CreateResult = async (req: clientRequest, res: Response) => {
  const studentId = req.user._id;
  const { id } = req.params;

  const moduleService = new ModuleService();
  const resultService = new ResultService();
  const questionService = new QuestionService();
  const studentService = new StudentService();

  const response = await moduleService.getModuleById(id);

  if (response["status"] === 200) {
    const module = response["module"].toObject();

    // const totalTimeTakenByStudent = module.student_time
    //   .filter((s) => s.student_id === studentId)
    //   .map((st) => st.totalTime)[0];

    const attemptedQuestionIdsByStudent = module.questionAttempted
      .filter((q) => q.student_id === studentId)
      .map((q) => q.question_id);
    const totalAttemptedQuestions = attemptedQuestionIdsByStudent.length;

    let promises = [];
    attemptedQuestionIdsByStudent.forEach((id) => {
      const result = questionService.getQuestionById(id);
      promises.push(result);
    });

    const allQuestions = await Promise.all(promises);

    let totalCorrectAnswers;
    if (allQuestions.length > 0) {
      totalCorrectAnswers = allQuestions.reduce((acc, curr) => {
        const question = curr.question.toObject();

        // 1. Find the correct option ID
        const correctOption = question.options.find(
          (o: any) => o.answer === true
        );

        if (!correctOption) return acc;

        // 2. Find the student's attempt for this question
        const studentAttempt = question.attempt.find(
          (a: any) => a.student_id === studentId
        );

        if (!studentAttempt) return acc; // No attempt made by this student

        // 3. Convert studentAttempt.option_id and correctOption._id to the same type (ObjectId)
        const studentOptionId = new mongoose.Types.ObjectId(
          studentAttempt.option_id
        );
        const correctOptionId = correctOption._id;

        // 4. Compare the student's selected option ID with the correct option ID
        const isCorrect = studentOptionId.equals(correctOptionId);

        return isCorrect ? acc + 1 : acc;
      }, 0);
    }

    // const accuracy =
    //   totalAttemptedQuestions > 0
    //     ? (totalCorrectAnswers / totalAttemptedQuestions) * 100
    //     : 0;

    const result = {
      student_id: studentId,
      exam_id: module.exam_id,
      module_id: module._id,
      chapter_id: module.chapter_Id,

      totalQuestions: module.questions.length,
      attemptedQuestions: totalAttemptedQuestions,
      correctAnswers: totalCorrectAnswers,
      //   accuracy: accuracy,
      //   totalTimeSpent: totalTimeTakenByStudent,
      isCompleted: module.questions.length === totalAttemptedQuestions,
    };

    const resultResponse = await resultService.createResult(result);

    if (resultResponse["status"] === 200) {
      // update result in student profile
      await studentService.updateResultInStudent(
        studentId,
        resultResponse["result"]._id
      );
      res
        .status(response["status"])
        .json({
          status: 200,
          message: response["message"],
          data: { result_id: resultResponse["result"]._id },
        });
    } else {
      res.status(response["status"]).json(response["message"]);
    }
  } else {
    res.status(response["status"]).json(response["message"]);
  }
};

export const GetResult = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultService = new ResultService();

  const response = await resultService.getResultById(id);

  if (response["status"] === 200) {
    res
      .status(response["status"])
      .json({ status: 200, data: response["result"] });
  } else {
    res.status(response["status"]).json(response["message"]);
  }
};
