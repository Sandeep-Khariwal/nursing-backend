import express from "express";
import { authenticateToken } from "../middleware/jwtToken";
import { CreateModule, GetAllModules } from "../controller/module.controller";
const moduleRouter = express.Router();

moduleRouter.post("/create",CreateModule)
moduleRouter.get("/getAll/:id", authenticateToken , GetAllModules)

export default moduleRouter;