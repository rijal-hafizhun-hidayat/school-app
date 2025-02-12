import { LoginRequest } from "../model/login-model";
import { LoginService } from "../service/login-service";

export class LoginController {
  static login = defineEventHandler(async (event) => {
    try {
      const request: LoginRequest = (await readBody(event)) as LoginRequest;
      const result = await LoginService.login(request);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });
}
