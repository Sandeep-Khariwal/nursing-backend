import express from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { CreateModule, GetAllModules, ReAppearModule, RemoveModule, SubmitModuleResponse } from "../controller/module.controller";
const moduleRouter = express.Router();

moduleRouter.post("/create",CreateModule)
moduleRouter.get("/getAll", authenticateToken , GetAllModules)
moduleRouter.put("/submit/:id", authenticateToken , SubmitModuleResponse);
moduleRouter.put("/removeModule/:id", authenticateToken , RemoveModule);
moduleRouter.put("/reappear/:id", authenticateToken , ReAppearModule);

export default moduleRouter;