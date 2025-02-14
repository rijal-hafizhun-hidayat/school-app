import { StudentRequest } from "../model/student-model";
import { StudentService } from "../service/student-service";

export class StudentController {
  static getAllStudentsWithClassSchool = defineEventHandler(async (event) => {
    try {
      const result = await StudentService.getAllStudentWithClassSchool();
      const query = getQuery(event);
      return {
        statusCode: 200,
        statusMessage: "get student success",
        data: result,
        query: query,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });

  static getStudentWithClassSchoolByStudentId = defineEventHandler(
    async (event) => {
      try {
        const studentId: number = parseInt(
          getRouterParam(event, "studentId") as string
        );
        const result =
          await StudentService.getStudentWithClassSchoolByStudentId(studentId);
        return {
          statusCode: 200,
          statusMessage: "get student success",
          data: result,
        };
      } catch (error) {
        return sendError(event, error as Error, false);
      }
    }
  );

  static updateStudentWithClassSchoolByStudentId = defineEventHandler(
    async (event) => {
      try {
        const studentId: number = parseInt(
          getRouterParam(event, "studentId") as string
        );
        const request: StudentRequest = (await readBody(
          event
        )) as StudentRequest;
        const result =
          await StudentService.updateStudentWithClassSchoolByStudentId(
            request,
            studentId
          );
        return {
          statusCode: 200,
          statusMessage: "update student success",
          data: result,
        };
      } catch (error) {
        return sendError(event, error as Error, false);
      }
    }
  );

  static destroyStudentByStudentId = defineEventHandler(async (event) => {
    try {
      const studentId: number = parseInt(
        getRouterParam(event, "studentId") as string
      );
      const result = await StudentService.destroyStudentByStudentId(studentId);
      return {
        statusCode: 200,
        statusMessage: "destroy student success",
        data: result,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });

  static storeStudent = defineEventHandler(async (event) => {
    try {
      const request: StudentRequest = (await readBody(event)) as StudentRequest;
      const result = await StudentService.storeStudent(request);
      return {
        statusCode: 200,
        statusMessage: "store student success",
        data: result,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });
}
