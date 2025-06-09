import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser"
import authRouter from "./routes/auth.route";
import adminRouter from "./routes/admin.route";
import teacherRouter from "./routes/teacher.route";
import studentRouter from "./routes/student.route";
import { DataBase } from "./DataBase";
import examRouter from "./routes/exams.route";
import dailyDoseRouter from "./routes/dailyDose.route";

dotenv.config();

const app: Express = express();
const PORT =  process.env.PORT || 8080
const VERSION = "v1"

app.use(cors());
app.use(express.json({
  strict: false,  // allows non-object JSON values like "" (not recommended long-term)
  verify: (req:Request, res:Response, buf) => {
    if (!buf.length) {
      req.body = {}; 
    }
  }
}));
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json({ limit: "50mb" }));

// all routes are here
app.use(`/api/${VERSION}/auth`,authRouter)
app.use(`/api/${VERSION}/admin`,adminRouter)
app.use(`/api/${VERSION}/student`,studentRouter)
app.use(`/api/${VERSION}/teacher`,teacherRouter)
app.use(`/api/${VERSION}/exam`,examRouter)
app.use(`/api/${VERSION}/dailyDose`,dailyDoseRouter)


//DataBase
DataBase()

// server creation
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});