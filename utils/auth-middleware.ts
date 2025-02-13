export class AuthMiddleware {
  static auth = defineEventHandler(async (event) => {
    const session = await getUserSession(event);

    if (!session.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "unauthorized",
      });
    }

    event.context.user = session.user;
  });
}
