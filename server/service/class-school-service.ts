import prisma from "~/utils/prisma";
import {
  ClassSchoolRequest,
  ClassSchoolResponse,
  toClassSchoolResponse,
  toClassSchoolsResponse,
} from "../model/class-school-model";
import { ClassSchoolValidation } from "../validation/class-school-validation";
import { Validation } from "../validation/validation";

export class ClassSchoolService {
  static async getAllClassSchool(): Promise<ClassSchoolResponse[]> {
    const classSchools = await prisma.class_school.findMany({});

    return toClassSchoolsResponse(classSchools);
  }

  static async getClassSchoolByClassSchoolId(
    classSchoolId: number
  ): Promise<ClassSchoolResponse> {
    const classSchool = await prisma.class_school.findUnique({
      where: {
        id: classSchoolId,
      },
    });

    if (!classSchool) {
      throw createError({
        statusCode: 404,
        statusMessage: "class school not found",
      });
    }

    return toClassSchoolResponse(classSchool);
  }

  static async updateClassSchoolByClassSchoolId(
    request: ClassSchoolRequest,
    classSchoolId: number
  ): Promise<ClassSchoolResponse> {
    const requestBody: ClassSchoolRequest = Validation.validate(
      ClassSchoolValidation.classSchoolSchema,
      request
    );

    const classSchool = await prisma.class_school.findUnique({
      where: {
        id: classSchoolId,
      },
    });

    if (!classSchool) {
      throw createError({
        statusCode: 404,
        statusMessage: "class school not found",
      });
    }

    const [updateClassSchool] = await prisma.$transaction([
      prisma.class_school.update({
        where: {
          id: classSchoolId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toClassSchoolResponse(updateClassSchool);
  }

  static async deatroyClassSchoolByClassSchoolId(
    classSchoolId: number
  ): Promise<ClassSchoolResponse> {
    const classSchool = await prisma.class_school.findUnique({
      where: {
        id: classSchoolId,
      },
    });

    if (!classSchool) {
      throw createError({
        statusCode: 404,
        statusMessage: "class school not found",
      });
    }

    const [destroyClassSchool] = await prisma.$transaction([
      prisma.class_school.delete({
        where: {
          id: classSchoolId,
        },
      }),
    ]);

    return toClassSchoolResponse(destroyClassSchool);
  }

  static async storeClassSchool(
    request: ClassSchoolRequest
  ): Promise<ClassSchoolResponse> {
    const requestBody: ClassSchoolRequest = Validation.validate(
      ClassSchoolValidation.classSchoolSchema,
      request
    );

    const [storeClassSchool] = await prisma.$transaction([
      prisma.class_school.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toClassSchoolResponse(storeClassSchool);
  }
}
