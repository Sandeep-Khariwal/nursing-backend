import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.route";
import adminRouter from "./routes/admin.route";
import teacherRouter from "./routes/teacher.route";
import studentRouter from "./routes/student.route";
import { DataBase } from "./DataBase";
import examRouter from "./routes/exams.route";
import dailyDoseRouter from "./routes/dailyDose.route";
import chapterRouter from "./routes/chapter.route";
import moduleRouter from "./routes/module.route";
import questionRouter from "./routes/question.route";
import resultRouter from "./routes/result.route";
import queryRouter from "./routes/query.route";
import quizRouter from "./routes/quiz.route";
import quizQuestionRouter from "./routes/quizQuestion.rote";
// import { testRedis } from "./bullmq/redisConnection";
import paymentRouter from "./routes/payment.route";
import Razorpay from "razorpay";
import nurtureRouter from "./routes/nurture.route";
import subscriptionRouter from "./routes/subscription.route";
import fs from "fs";
import path from "path";

dotenv.config();

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const app: Express = express();
const PORT = process.env.PORT || 9799;
const VERSION = "v1";

app.use(cors());
app.use(
  express.json({
    strict: false,
    verify: (req: Request, res: Response, buf) => {
      if (!buf.length) {
        req.body = {};
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// all routes are here
app.use(`/api/${VERSION}/auth`, authRouter);
app.use(`/api/${VERSION}/admin`, adminRouter);
app.use(`/api/${VERSION}/student`, studentRouter);
app.use(`/api/${VERSION}/teacher`, teacherRouter);

app.use(`/api/${VERSION}/exam`, examRouter);
app.use(`/api/${VERSION}/dailyDose`, dailyDoseRouter);
app.use(`/api/${VERSION}/chapter`, chapterRouter);
app.use(`/api/${VERSION}/module`, moduleRouter);
app.use(`/api/${VERSION}/question`, questionRouter);
app.use(`/api/${VERSION}/result`, resultRouter);
app.use(`/api/${VERSION}/query`, queryRouter);
app.use(`/api/${VERSION}/quiz`, quizRouter);
app.use(`/api/${VERSION}/quizQuestion`, quizQuestionRouter);
app.use(`/api/${VERSION}/payment`, paymentRouter);
app.use(`/api/${VERSION}/nurture`, nurtureRouter);
app.use(`/api/${VERSION}/subscription`, subscriptionRouter);

//DataBase
DataBase();

// redis
// testRedis();

//razorpay
export const myRazorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// server creation
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
