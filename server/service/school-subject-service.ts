import prisma from "~/utils/prisma";
import {
  SchoolSubjectRequest,
  SchoolSubjectResponse,
  toSchoolSubjectResponse,
  toSchoolSubjectsResponse,
} from "../model/school-subject-model";
import { SchoolSubjectValidation } from "../validation/school-subject-validation";
import { Validation } from "../validation/validation";

export class SchoolSubjectService {
  static async getAllSchoolSubject(): Promise<SchoolSubjectResponse[]> {
    const schoolSubjects = await prisma.school_subject.findMany({});

    return toSchoolSubjectsResponse(schoolSubjects);
  }

  static async updateSchoolSubjectBySchoolSubjectId(
    request: SchoolSubjectRequest,
    schoolSubjectId: number
  ): Promise<SchoolSubjectResponse> {
    const requestBody: SchoolSubjectRequest = Validation.validate(
      SchoolSubjectValidation.schoolSubjectSchema,
      request
    );

    const schoolSubject = await prisma.school_subject.findUnique({
      where: {
        id: schoolSubjectId,
      },
    });

    if (!schoolSubject) {
      throw createError({
        statusCode: 404,
        statusMessage: "school subject not found",
      });
    }

    const [updateSchoolSubject] = await prisma.$transaction([
      prisma.school_subject.update({
        where: {
          id: schoolSubjectId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toSchoolSubjectResponse(updateSchoolSubject);
  }

  static async getSchoolSubjectBySchoolSubjectId(
    schoolSubjectId: number
  ): Promise<SchoolSubjectResponse> {
    const schoolSubject = await prisma.school_subject.findUnique({
      where: {
        id: schoolSubjectId,
      },
    });

    if (!schoolSubject) {
      throw createError({
        statusCode: 404,
        statusMessage: "school subject not found",
      });
    }

    return toSchoolSubjectResponse(schoolSubject);
  }

  static async destroySchoolSubjectBySchoolSubjectId(
    schoolSubjectId: number
  ): Promise<SchoolSubjectResponse> {
    const schoolSubject = await prisma.school_subject.findUnique({
      where: {
        id: schoolSubjectId,
      },
    });

    if (!schoolSubject) {
      throw createError({
        statusCode: 404,
        statusMessage: "school subject not found",
      });
    }

    const [destroySchoolSubject] = await prisma.$transaction([
      prisma.school_subject.delete({
        where: {
          id: schoolSubjectId,
        },
      }),
    ]);

    return toSchoolSubjectResponse(destroySchoolSubject);
  }

  static async storeSchoolSubject(
    request: SchoolSubjectRequest
  ): Promise<SchoolSubjectResponse> {
    const requestBody: SchoolSubjectRequest = Validation.validate(
      SchoolSubjectValidation.schoolSubjectSchema,
      request
    );

    const [storeSchoolSubject] = await prisma.$transaction([
      prisma.school_subject.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toSchoolSubjectResponse(storeSchoolSubject);
  }
}
