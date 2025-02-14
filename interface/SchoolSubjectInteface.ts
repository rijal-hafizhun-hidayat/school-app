export interface SchoolSubjectForm {
  name: string;
}

export interface SchoolSubjectFetch {
  statusCode: number;
  statusMessage: string;
  data: SchoolSubject | SchoolSubject[];
}

export interface SchoolSubject {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
