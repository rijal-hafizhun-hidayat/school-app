import { class_school } from "@prisma/client";

export interface ClassSchoolRequest {
  name: string;
}

export interface ClassSchoolResponse {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export function toClassSchoolResponse(
  classSchool: class_school
): ClassSchoolResponse {
  return {
    id: classSchool.id,
    name: classSchool.name,
    created_at: classSchool.created_at,
    updated_at: classSchool.updated_at,
  };
}

export function toClassSchoolsResponse(
  classSchools: class_school[]
): ClassSchoolResponse[] {
  return classSchools.map((classSchool) => ({
    id: classSchool.id,
    name: classSchool.name,
    created_at: classSchool.created_at,
    updated_at: classSchool.updated_at,
  }));
}
