import { school_subject } from "@prisma/client";

export interface SchoolSubjectRequest {
  name: string;
}

export interface SchoolSubjectResponse {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export function toSchoolSubjectResponse(
  schoolSubject: school_subject
): SchoolSubjectResponse {
  return {
    id: schoolSubject.id,
    name: schoolSubject.name,
    created_at: schoolSubject.created_at,
    updated_at: schoolSubject.updated_at,
  };
}

export function toSchoolSubjectsResponse(
  schoolSubjects: school_subject[]
): SchoolSubjectResponse[] {
  return schoolSubjects.map((schoolSubject) => ({
    id: schoolSubject.id,
    name: schoolSubject.name,
    created_at: schoolSubject.created_at,
    updated_at: schoolSubject.updated_at,
  }));
}
