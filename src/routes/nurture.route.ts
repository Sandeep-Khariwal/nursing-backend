import express from "express";
import { CreateNurture, GetNurture } from "../controller/nurture.controller";
const nurtureRouter = express.Router();

nurtureRouter.post("/create", CreateNurture);
nurtureRouter.get("/", GetNurture);

export default nurtureRouter;
