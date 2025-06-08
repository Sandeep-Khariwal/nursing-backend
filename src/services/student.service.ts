import studentModel from "../models/student.model";

export class StudentService {
  public async updateStudentExamsById(id: string, exams: string[]) {
    try {
      const updateExams = exams.map((e, i) => {
        if (i === 0) {
          return {
            _id: e,
            is_primary: true,
          };
        } else {
          return {
            _id: e,
            is_primary: false,
          };
        }
      });
      const updateExam = await studentModel.findByIdAndUpdate(id, {
        $addToSet: { exams: updateExams },
      });
      return {
        status: 200,
        message: "Exams updated!!",
        selectedExam: updateExam,
      };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }

  public async deleteAccount(id: string) {
    try {
      await studentModel.findByIdAndUpdate(id,{isDeleted:true})
      return {status:200,message:"account deleted"}
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
}
