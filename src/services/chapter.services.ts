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

  public async updateChapterById(name: string, chapterId: string) {
    try {
      const chapter = await Chapter.findByIdAndUpdate(
        chapterId,
        { name: name },
        { new: true }
      );
      return { status: 200, chapter, message: "chapter updated!!" };
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }
  public async getAllChaptersByExamId(examId: string) {
    try {
      const chapters = await Chapter.find({ examId, isDeleted: false });

      if (chapters.length === 0) {
        return { status: 404, message: "Chapters not found!!" };
      }

      return { status: 200, chapters: chapters };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
  public async getAllChapters() {
    try {
      const chapters = await Chapter.find({ isDeleted: false });

      if (chapters.length === 0) {
        return { status: 404, message: "Chapters not found!!" };
      }

      return { status: 200, chapters: chapters };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }

  public async addNewModuleInChapter(id: string, moduleId: string) {
    try {
      const chapters = await Chapter.findByIdAndUpdate(id, {
        $addToSet: { modules: moduleId },
      });

      return { status: 200, chapters: chapters };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
  public async removeChapterById(id: string) {
    try {
      const chapter = await Chapter.findByIdAndUpdate(
        id,
        {
          $set: { isDeleted: true },
        },
        { new: true }
      );
      if (!chapter) {
        return { status: 404, message: "Chapter not found!!" };
      }
      return { status: 200, chapter, message: "Chapter removed!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async removeManyChaptersByExamId(examId: string) {
    try {
      await Chapter.updateMany(
        { examId: examId },
        { $set: { isDeleted: true } }
      );
      return { status: 200, message: "Chapter removed!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
