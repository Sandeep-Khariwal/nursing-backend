import express  from "express";
import { CreateQuiz, GetAllQuizes, GetPostionsInQuiz, GetQuizForRegistration, GetToQuiz, RegistrationClose, RegistrationOpen, RemoveQuiz, SetQuizClose, SetQuizLive, SubmitQuizResponse } from "../controller/quiz.controller";
import { authenticateToken } from "../middleware/jwtToken";
const quizRouter = express.Router();

quizRouter.post("/create" ,authenticateToken , CreateQuiz);

quizRouter.put("/live" ,authenticateToken, SetQuizLive);
quizRouter.put("/closeLive" ,authenticateToken, SetQuizClose);
quizRouter.put("/registrationOpen" ,authenticateToken, RegistrationOpen);
quizRouter.put("/registrationClose" ,authenticateToken, RegistrationClose);
quizRouter.put("/submit/:id" , authenticateToken , SubmitQuizResponse);
quizRouter.put("/removeQuiz" , authenticateToken , RemoveQuiz);

quizRouter.get("/getQuiz" ,authenticateToken, GetToQuiz);
quizRouter.get("/getAll" ,authenticateToken, GetAllQuizes);
quizRouter.get("/getQuizForRegistration" ,authenticateToken, GetQuizForRegistration);
quizRouter.get("/getPosition/:id" ,authenticateToken, GetPostionsInQuiz);

export default quizRouter