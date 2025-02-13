import {
  LoginRequest,
  LoginResponse,
  toLoginResponse,
} from "../model/login-model";
import { Token } from "../../utils/token";
import { LoginValidation } from "../validation/login-validation";
import { Validation } from "../validation/validation";
import type { H3Event } from "h3";
import prisma from "~/utils/prisma";

export class LoginService {
  static async login(
    request: LoginRequest,
    event: H3Event
  ): Promise<LoginResponse> {
    const requestBody: LoginRequest = Validation.validate(
      LoginValidation.loginSchema,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "email or password doesnt match in our record",
      });
    }

    const isPasswordMatch = await verifyPassword(
      user.password,
      requestBody.password
    );

    if (!isPasswordMatch) {
      throw createError({
        statusCode: 400,
        statusMessage: "email or password doesnt match in our record",
      });
    }

    const token: string = await Token.generateToken(user);

    await setUserSession(event, {
      user: {
        name: user.name,
        email: user.email,
        role: user.user_role?.role.name,
      },
    });

    return toLoginResponse(token);
  }
}
