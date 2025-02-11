import { ZodError } from "zod";

export class Error {
  static formatErrors(error: ZodError): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};

    error.errors.forEach((err) => {
      const field = err.path.join(".");
      if (!formattedErrors[field]) {
        formattedErrors[field] = [];
      }
      formattedErrors[field].push(err.message);
    });

    return formattedErrors;
  }
}
