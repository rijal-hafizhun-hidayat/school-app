import prisma from "~/utils/prisma";
import {
  StudentRequest,
  StudentResponse,
  StudentWithClassSchoolResponse,
  toStudentResponse,
  toStudentsWithClassSchoolResponse,
  toStudentWithclassSchoolResponse,
} from "../model/student-model";
import { StudentValidation } from "../validation/student-validation";
import { Validation } from "../validation/validation";

export class StudentService {
  static async getAllStudentWithClassSchool(): Promise<
    StudentWithClassSchoolResponse[]
  > {
    const students = await prisma.student.findMany({
      include: {
        class_school: true,
      },
    });

    return toStudentsWithClassSchoolResponse(students);
  }

  static async getStudentWithClassSchoolByStudentId(
    studentId: number
  ): Promise<StudentWithClassSchoolResponse> {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        class_school: true,
      },
    });

    if (!student) {
      throw createError({
        statusCode: 404,
        statusMessage: "student not found",
      });
    }

    return toStudentWithclassSchoolResponse(student);
  }

  static async updateStudentWithClassSchoolByStudentId(
    request: StudentRequest,
    studentId: number
  ): Promise<StudentWithClassSchoolResponse> {
    const requestBody: StudentRequest = Validation.validate(
      StudentValidation.studentSchema,
      request
    );

    const classSchool = await prisma.class_school.findUnique({
      where: {
        id: requestBody.class_school_id,
      },
    });

    if (!classSchool) {
      throw createError({
        statusCode: 404,
        statusMessage: "class school not found",
      });
    }

    const [updateStudent] = await prisma.$transaction([
      prisma.student.update({
        where: {
          id: studentId,
        },
        data: {
          name: requestBody.name,
          class_school_id: requestBody.class_school_id,
        },
        include: {
          class_school: true,
        },
      }),
    ]);

    return toStudentWithclassSchoolResponse(updateStudent);
  }

  static async destroyStudentByStudentId(
    studentId: number
  ): Promise<StudentResponse> {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      throw createError({
        statusCode: 404,
        statusMessage: "student not found",
      });
    }

    const [destroyStudent] = await prisma.$transaction([
      prisma.student.delete({
        where: {
          id: studentId,
        },
      }),
    ]);

    return toStudentResponse(destroyStudent);
  }

  static async storeStudent(
    request: StudentRequest
  ): Promise<StudentWithClassSchoolResponse> {
    const requestBody: StudentRequest = Validation.validate(
      StudentValidation.studentSchema,
      request
    );

    const classSchool = await prisma.class_school.findUnique({
      where: {
        id: requestBody.class_school_id,
      },
    });

    if (!classSchool) {
      throw createError({
        statusCode: 404,
        statusMessage: "class school not found",
      });
    }

    const [storeStudent] = await prisma.$transaction([
      prisma.student.create({
        data: {
          name: requestBody.name,
          class_school_id: requestBody.class_school_id,
        },
        include: {
          class_school: true,
        },
      }),
    ]);

    return toStudentWithclassSchoolResponse(storeStudent);
  }
}
