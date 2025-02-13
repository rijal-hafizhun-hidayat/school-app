import { AuthMiddleware } from "../../utils/auth-middleware";

export class AuthController {
  static me = defineEventHandler(async (event) => {
    try {
      await AuthMiddleware.auth(event);

      return {
        statusCode: 200,
        statusMessage: "success get current user",
        data: event.context.user,
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });

  static logout = defineEventHandler(async (event) => {
    try {
      await AuthMiddleware.auth(event);
      await clearUserSession(event);

      return {
        statusCode: 200,
        statusMessage: "success logout",
      };
    } catch (error) {
      return sendError(event, error as Error, false);
    }
  });
}
