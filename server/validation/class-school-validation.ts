import { string, z, ZodType } from "zod";

export class ClassSchoolValidation {
  static readonly classSchoolSchema: ZodType = z.object({
    name: string().min(1, {
      message: "nama kelas wajib diisi",
    }),
  });
}
