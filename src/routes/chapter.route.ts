import express  from "express";
import { CreateChapter, GetAllChapter } from "../controller/chapter.controller";
import { authenticateToken } from "../middleware/jwtToken";

const chapterRouter = express.Router();

chapterRouter.post("/create", CreateChapter);
chapterRouter.get("/getAll/:examId", authenticateToken , GetAllChapter);

export default chapterRouter