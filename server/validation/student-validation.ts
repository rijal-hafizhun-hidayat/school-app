import { number, string, z, ZodType } from "zod";

export class StudentValidation {
  static readonly studentSchema: ZodType = z.object({
    name: string().min(1, {
      message: "nama wajib diisi",
    }),
    class_school_id: number()
      .min(1, {
        message: "kelas wajib diisi",
      })
      .int({
        message: "format kelas salah",
      }),
  });
}
