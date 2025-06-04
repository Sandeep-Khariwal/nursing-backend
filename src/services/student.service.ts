import studentModel from "../models/student.model";

export class StudentService {
  public async updateStudentExamsById(id: string, exams: string[]) {
    try {
      await studentModel.findByIdAndUpdate(id, { $addToSet: { exams: exams } });
      return { status: 200, message: "Exams updated!!" };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
}
