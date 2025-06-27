import studentModel from "../models/student.model";

export class StudentService {
  public async updateStudentExamsById(
    id: string,
    exams: { _id: string; name: string }[]
  ) {
    try {
      const updateExams = exams.map((e, i) => {
        if (i === 0) {
          return {
            _id: e,
            name: e.name,
            is_primary: true,
          };
        } else {
          return {
            _id: e,
            name: e.name,
            is_primary: false,
          };
        }
      });
      const updateExam = await studentModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { exams: updateExams },
        },
        { new: true }
      );
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
      await studentModel.findByIdAndUpdate(id, { isDeleted: true });
      return { status: 200, message: "account deleted" };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
  public async getStudentById(id: string) {
    try {
      const student = await studentModel.findById(id, { isDeleted: false });
      const studentObj = student.toObject();
      delete studentObj.token;
      return { status: 200, student: studentObj };
    } catch (error) {
      const errorObj = { message: error.message, status: 500 };
      return errorObj;
    }
  }
  public async updateResultInStudent(id: string, resultId: string) {
    try {
      await studentModel.findByIdAndUpdate(id, {
        $push: { results: resultId },
      });
      return { status: 200, message: "Result created!!" };
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }
  public async removeResultFromStudent(id: string, resultId: string) {
    try {
      await studentModel.findByIdAndUpdate(id, {
        $pull: { results: resultId },
      });
      return { status: 200, message: "Result removed from student!!" };
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }
}
