import { SchoolSubjectRequest } from "../model/school-subject-model";
import { SchoolSubjectService } from "../service/school-subject-service";

export class SchoolSubjectController {
  static getAllSchoolSubject = defineEventHandler(async (event) => {
    try {
      const result = await SchoolSubjectService.getAllSchoolSubject();
      return {
        statusCode: 200,
        statusMessage: "get school subject success",
        data: result,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });

  static updateSchoolSubjectBySchoolSubjectId = defineEventHandler(
    async (event) => {
      try {
        const schoolSubjectId: number = parseInt(
          getRouterParam(event, "schoolSubjectId") as string
        );
        const request: SchoolSubjectRequest = (await readBody(
          event
        )) as SchoolSubjectRequest;
        const result =
          await SchoolSubjectService.updateSchoolSubjectBySchoolSubjectId(
            request,
            schoolSubjectId
          );
        return {
          statusCode: 200,
          statusMessage: "update school subject success",
          data: result,
        };
      } catch (error) {
        return sendError(event, error as Error, false);
      }
    }
  );

  static getSchoolSubjectBySchoolSubjectId = defineEventHandler(
    async (event) => {
      try {
        const schoolSubjectId: number = parseInt(
          getRouterParam(event, "schoolSubjectId") as string
        );
        const result =
          await SchoolSubjectService.getSchoolSubjectBySchoolSubjectId(
            schoolSubjectId
          );
        return {
          statusCode: 200,
          statusMessage: "get school subject success",
          data: result,
        };
      } catch (error) {
        return sendError(event, error as Error, false);
      }
    }
  );

  static destroySchoolSubjectBySchoolSubjectId = defineEventHandler(
    async (event) => {
      try {
        const schoolSubjectId: number = parseInt(
          getRouterParam(event, "schoolSubjectId") as string
        );
        const result =
          await SchoolSubjectService.destroySchoolSubjectBySchoolSubjectId(
            schoolSubjectId
          );
        return {
          statusCode: 200,
          statusMessage: "destroy school subject success",
          data: result,
        };
      } catch (error) {
        return sendError(event, error as Error, false);
      }
    }
  );

  static storeSchoolSubject = defineEventHandler(async (event) => {
    try {
      const request: SchoolSubjectRequest = (await readBody(
        event
      )) as SchoolSubjectRequest;
      const result = await SchoolSubjectService.storeSchoolSubject(request);
      return {
        statusCode: 200,
        statusMessage: "store school subject success",
        data: result,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });
}
