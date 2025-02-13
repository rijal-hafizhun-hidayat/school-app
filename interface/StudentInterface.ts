import type { class_school } from "@prisma/client";
import type { ClassSchool } from "./ClassSchoolInterface";

export interface StudentForm {
  name: string;
  class_school: class_school | null;
}

export interface StudentWithClassSchool {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  class_school: ClassSchool;
}

export interface StudentFetch {
  statusCode: number;
  statusMessage: string;
  data: StudentWithClassSchool | StudentWithClassSchool[];
}
