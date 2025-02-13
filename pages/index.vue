<script setup lang="ts">
import type { Validation } from "~/server/model/validation-model";
import { Sweetalert } from "~/server/utils/sweetalert";
import type { LoginForm } from "~/types/login-interface";
const { loggedIn, user, fetch: refreshSesion } = useUserSession();

const authStore = useAuthStore();
const router = useRouter();
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<Validation | null> = ref(null);
const form: LoginForm = reactive({
  email: "",
  password: "",
});

const send = async (): Promise<void> => {
  try {
    isLoading.value = true;
    await authStore.login(form);
    await refreshSesion();

    router.push({
      name: "dashboard",
    });
  } catch (error: any) {
    const err = error.data as Validation;
    validation.value = err;
    if (validation.value && validation.value.statusCode != 400) {
      Sweetalert.errorAlert(validation.value.statusMessage);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <NuxtLayout name="guest-layout">
    <form @submit.prevent="send" class="space-y-5">
      <div>
        <BaseInputLabel>email</BaseInputLabel>
        <BaseTextInput
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
        ></BaseTextInput>
        <BaseInputError
          v-if="
            validation && validation.statusCode === 400 && validation.data.email
          "
          :message="validation.data.email[0]"
        />
      </div>
      <div>
        <BaseInputLabel>password</BaseInputLabel>
        <BaseTextInput
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
        ></BaseTextInput>
        <BaseInputError
          v-if="
            validation &&
            validation.statusCode === 400 &&
            validation.data.password
          "
          :message="validation.data.password[0]"
        />
      </div>
      <div class="flex justify-end">
        <BasePrimaryButton type="submit">login</BasePrimaryButton>
      </div>
    </form>
  </NuxtLayout>
</template>
