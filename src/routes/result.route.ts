import express  from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { createResult } from "../controller/result.controller";
const resultRouter = express.Router();

resultRouter.post("/create/:id", authenticateToken , createResult);

export default resultRouter