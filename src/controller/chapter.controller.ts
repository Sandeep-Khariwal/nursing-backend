import { ExamService } from "../services/exam.service";
import { ChapterService } from "../services/chapter.services";
import { Request, Response } from "express";

export const CreateChapter = async (req: Request, res: Response) => {
  const { name, examId } = req.body;

  const chapterService = new ChapterService();
  const examService = new ExamService();

  const response = await chapterService.createChapter({ name, examId });

  if (response["status"] === 200) {
    // add chapter in exam
    await examService.addNewChapter(examId, response["chapter"]._id);
    res.status(200).json({
      status: 200,
      data: response["chapter"],
      message: response["message"],
    });
  } else {
    res.status(response["status"]).json(response["message"]);
  }
};
export const GetAllChapter = async (req: Request, res: Response) => {
  const { examId } = req.params;

  const chapterService = new ChapterService();

  const response = await chapterService.getAllChaptersByExamId(examId);

  if (response["status"] === 200) {
    const chapters = response["chapters"].map((c) => {
      const chapter = c.toObject();
      return {
        ...chapter,
        modules: chapter.modules.length,
      };
    });

    res.status(200).json({
      status: 200,
      data: chapters,
    });
  } else {
    res.status(response["status"]).json(response["message"]);
  }
};
