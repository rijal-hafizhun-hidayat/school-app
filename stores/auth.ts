import { defineStore } from "pinia";
import type { Auth } from "~/types/auth-interface";
import type { LoginFetch, LoginForm } from "~/types/login-interface";

export const useAuthStore = defineStore("auth", () => {
  const auth: Ref<Auth | null> = ref(null);
  const token: Ref<string> = ref("");

  async function login(request: LoginForm): Promise<void> {
    const { $api } = useNuxtApp();

    const result: LoginFetch = await $api("login", {
      method: "post",
      body: {
        email: request.email,
        password: request.password,
      },
    });

    token.value = result.data.token;
    sessionStorage.setItem("token", token.value);
  }

  return {
    auth,
    login,
  };
});
