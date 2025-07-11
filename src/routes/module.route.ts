import express from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { CreateModule, GetAllModules, GetAllQuetionFieldModules, ReAppearModule, RemoveModule, RestoreModules, SubmitModuleResponse } from "../controller/module.controller";
const moduleRouter = express.Router();

moduleRouter.post("/create",CreateModule)
moduleRouter.get("/getAll", authenticateToken , GetAllModules)
moduleRouter.get("/getAll/:id", authenticateToken , GetAllQuetionFieldModules)
moduleRouter.put("/submit/:id", authenticateToken , SubmitModuleResponse);
moduleRouter.put("/removeModule/:id", authenticateToken , RemoveModule);
moduleRouter.put("/reappear/:id", authenticateToken , ReAppearModule);
moduleRouter.put("/restore/:id", authenticateToken , RestoreModules)

export default moduleRouter;