import { string, z, ZodType } from "zod";

export class SchoolSubjectValidation {
  static readonly schoolSubjectSchema: ZodType = z.object({
    name: string().min(1, {
      message: "nama wajib diisi",
    }),
  });
}
