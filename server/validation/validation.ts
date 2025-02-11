import { createError } from "h3";

import { ZodType } from "zod";
import { Error } from "../utils/error";

export class Validation {
  static validate<T>(schema: ZodType, data: T): T {
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation Error",
        data: Error.formatErrors(parsed.error), // Return structured validation errors
      });
    }

    return parsed.data;
  }
}
