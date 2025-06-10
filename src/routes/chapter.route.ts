import express  from "express";
import { CreateChapter, GetAllChapter } from "../controller/chapter.controller";

const chapterRouter = express.Router();

chapterRouter.post("/create", CreateChapter);
chapterRouter.get("/getAll/:examId", GetAllChapter);

export default chapterRouter