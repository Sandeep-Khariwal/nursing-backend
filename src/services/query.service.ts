import { randomUUID } from "crypto";
import Query from "../models/query.model";
import { Stats } from "fs";

export class QueryService {
  public async createQuery(data: { studentId: string; query: string , examId:string }) {
    try {
      const query = new Query();
      query._id = `QURY-${randomUUID()}`;
      query.query = data.query;
      query.studentId = data.studentId;
      query.examId = data.examId;
      query.isDeleted = false;

      const newQuery = await query.save();
      return { status: 200, query: newQuery, message: "Query created!!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async getQueryForStudent(id: string,examId:string) {
    try {
      const queries = await Query.find({ examId , isDeleted: false });

      const query = queries.filter((qry) => {
        if (qry.isPublic || qry.studentId === id) {
          return qry;
        }
      });

      if (query && query.length === 0) {
        return { status: 200, query: [], message: "List is empty!!" };
      }

      return { status: 200, query };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async getQueryForAdmin() {
    try {
      const queries = await Query.find({ isDeleted: false });

      if (queries && queries.length === 0) {
        return { status: 200, query: [], message: "List is empty!!" };
      }

      return { status: 200, query: queries };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  public async updateQueryById(
    id: string,
    data: { isPublic: boolean; reply: string }
  ) {
    try {
      const query = await Query.findByIdAndUpdate(id, data, { new: true });

      if (!query) {
        return { status: 404, message: "Query not found!!" };
      }

      return { status: 200, query };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
