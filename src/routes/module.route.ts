import express from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { CreateModule, GetAllModules, ReAppearModule, SubmitModuleResponse } from "../controller/module.controller";
const moduleRouter = express.Router();

moduleRouter.post("/create",CreateModule)
moduleRouter.get("/getAll/:id", authenticateToken , GetAllModules)
moduleRouter.put("/submit/:id", authenticateToken , SubmitModuleResponse);
moduleRouter.put("/reappear/:id", authenticateToken , ReAppearModule);

export default moduleRouter;