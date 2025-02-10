import { createError } from "h3";

import { ZodType } from "zod";

export class Validation {
  static validate<T>(schema: ZodType, data: T): T {
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation Error",
        data: parsed.error.format(), // Return structured validation errors
      });
    }

    return parsed.data; // Return validated data
  }
}
