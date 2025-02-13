export interface ClassSchoolForm {
  name: string;
}

export interface ClassSchoolFetch {
  statusCode: number;
  statusMessage: string;
  data: ClassSchool | ClassSchool[];
}

export interface ClassSchool {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
