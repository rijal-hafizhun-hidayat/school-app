import { AuthController } from "~/server/controller/auth-controller";

export default defineEventHandler(() => AuthController.logout);
