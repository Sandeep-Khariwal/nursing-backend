import { Request, Response } from "express";
import { clientRequest } from "../middleware/jwtToken";
import { StudentService } from "../services/student.service";
import { ExamService } from "../services/exam.service";

export const UpdateStudentExam = async (req: clientRequest, res: Response) => {
  const { _id } = req.user;
  const { exams } = req.body;
  const studentService = new StudentService();
    const examService = new ExamService()
  
    let examResponse = exams.map(async(id:any)=>{
       return await examService.findNameById(id)
    })

    const allExamData = await Promise.all(examResponse)

    const newExamData = allExamData.map((e)=>{return{_id:e._id,name:e.name}}) ;

  const response = await studentService.updateStudentExamsById(_id, newExamData);
  if (response["status"] == 200) {
    res
      .status(200)
      .json({
        status: response["status"],
        data: response["selectedExam"],
        message: response["message"],
      });
  } else {
    res
      .status(response["status"])
      .json({ status: response["status"], message: response["message"] });
  }
};
