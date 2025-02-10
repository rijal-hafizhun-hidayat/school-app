import {
  LoginRequest,
  LoginResponse,
  toLoginResponse,
} from "../model/login-model";
import { Token } from "../utils/token";
import { LoginValidation } from "../validation/login-validation";
import { Validation } from "../validation/validation";

export class LoginService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const requestBody: LoginRequest = Validation.validate(
      LoginValidation.loginSchema,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
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

    return toLoginResponse(token);
  }
}
