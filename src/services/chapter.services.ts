import { randomUUID } from "crypto";
import Chapter from "../models/chapter.model";

export class ChapterService {
  public async createChapter(data: { name: string; examId: string }) {
    try {
      const chapter = new Chapter();
      chapter._id = `CPTR-${randomUUID()}`;
      chapter.name = data.name;
      chapter.examId = data.examId;

      const newChapter = await chapter.save();

      return { status: 200, chapter: newChapter, message: "chapter created!!" };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
  public async getAllChaptersByExamId(examId: string ) {
    try {
      const chapters = await Chapter.find({examId})

      return { status: 200, chapters: chapters};
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
}
