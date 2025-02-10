import { string, z, ZodType } from "zod";

export class LoginValidation {
  static readonly loginSchema: ZodType = z.object({
    email: string().min(1, {
      message: "email wajib diisi",
    }),
    password: string().min(1, {
      message: "password wajib diisi",
    }),
  });
}
