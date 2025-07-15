import { Request, Response } from "express";
import { clientRequest } from "../middleware/jwtToken";
import { QueryService } from "../services/query.service";
import { IsStudent } from "../HelperFunction";

export const CreateQuery = async (req: clientRequest, res: Response) => {
  const studentId = req.user._id;
  const { query } = req.body;

  const queryService = new QueryService();
  const response = await queryService.createQuery({ studentId, query });

  if (response["status"] === 200) {
    res.status(response["status"]).json({
      status: response["status"],
      query: response["query"],
      mesaage: response["message"],
    });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};

export const GetAllQuery = async (req: clientRequest, res: Response) => {
  const userId = req.user._id;

  const isStudent = IsStudent(userId);
  const queryService = new QueryService();

  let response;
  if (isStudent) {
    response = await queryService.getQueryForStudent(userId);
  } else {
    response = await queryService.getQueryForAdmin();
  }

  if (response["status"] === 200) {
    res.status(response["status"]).json({
      status: response["status"],
      query: response["query"],
      mesaage: response["message"],
    });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
export const PostReply = async (req: clientRequest, res: Response) => {
  const {id} = req.params
  const {isPublic,reply} = req.body;

  const queryService = new QueryService();

  const response = await queryService.updateQueryById(id,{isPublic,reply})

  if (response["status"] === 200) {
    res.status(response["status"]).json({
      status: response["status"],
      query: response["query"],
      mesaage: response["message"],
    });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
