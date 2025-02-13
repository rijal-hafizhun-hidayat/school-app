import { ClassSchoolRequest } from "../model/class-school-model";
import { ClassSchoolService } from "../service/class-school-service";

export class ClassSchoolController {
  static getAllClassSchools = defineEventHandler(async (event) => {
    try {
      const result = await ClassSchoolService.getAllClassSchool();
      return {
        statusCode: 200,
        statusMessage: "get all class school success",
        data: result,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });

  static getClassSchoolByClassSchoolId = defineEventHandler(async (event) => {
    try {
      const classSchoolId = parseInt(
        getRouterParam(event, "classSchoolId") as string
      );
      const result = await ClassSchoolService.getClassSchoolByClassSchoolId(
        classSchoolId
      );
      return {
        statusCode: 200,
        statusMessage: "get class school success",
        data: result,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });

  static updateClassSchoolByClassSchoolId = defineEventHandler(
    async (event) => {
      try {
        const classSchoolId = parseInt(
          getRouterParam(event, "classSchoolId") as string
        );
        const request: ClassSchoolRequest = (await readBody(
          event
        )) as ClassSchoolRequest;
        const result =
          await ClassSchoolService.updateClassSchoolByClassSchoolId(
            request,
            classSchoolId
          );
        return {
          statusCode: 200,
          statusMessage: "update class school success",
          data: result,
        };
      } catch (error) {
        return sendError(event, error as Error, false);
      }
    }
  );

  static destroyClassSchoolByClassSchoolId = defineEventHandler(
    async (event) => {
      try {
        const classSchoolId = parseInt(
          getRouterParam(event, "classSchoolId") as string
        );
        const result =
          await ClassSchoolService.deatroyClassSchoolByClassSchoolId(
            classSchoolId
          );
        return {
          statusCode: 200,
          statusMessage: "destroy class school success",
          data: result,
        };
      } catch (error) {
        return sendError(event, error as Error, false);
      }
    }
  );

  static storeClassSchool = defineEventHandler(async (event) => {
    try {
      const request: ClassSchoolRequest = (await readBody(
        event
      )) as ClassSchoolRequest;
      const result = await ClassSchoolService.storeClassSchool(request);

      return {
        statusCode: 200,
        statusMessage: "store class school success",
        data: result,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });
}
