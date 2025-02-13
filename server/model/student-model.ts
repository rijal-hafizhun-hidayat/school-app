import { class_school, student } from "@prisma/client";

export interface StudentRequest {
  name: string;
  class_school_id: number;
}

export interface StudentWithClassSchool {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  class_school: class_school;
}

export interface StudentResponse {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface StudentWithClassSchoolResponse {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  class_school: {
    name: string;
    created_at: Date;
    updated_at: Date;
  };
}

export function toStudentWithclassSchoolResponse(
  student: StudentWithClassSchool
): StudentWithClassSchoolResponse {
  return {
    id: student.id,
    name: student.name,
    created_at: student.created_at,
    updated_at: student.updated_at,
    class_school: {
      name: student.class_school.name,
      created_at: student.class_school.created_at,
      updated_at: student.class_school.updated_at,
    },
  };
}

export function toStudentResponse(student: student): StudentResponse {
  return {
    id: student.id,
    name: student.name,
    created_at: student.created_at,
    updated_at: student.updated_at,
  };
}

export function toStudentsWithClassSchoolResponse(
  students: StudentWithClassSchool[]
): StudentWithClassSchoolResponse[] {
  return students.map((student) => ({
    id: student.id,
    name: student.name,
    created_at: student.created_at,
    updated_at: student.updated_at,
    class_school: {
      name: student.class_school.name,
      created_at: student.class_school.created_at,
      updated_at: student.class_school.updated_at,
    },
  }));
}
