<script setup lang="ts">
import type { LoginForm } from "~/types/login-interface";

const { $api } = useNuxtApp();
const form: LoginForm = reactive({
  email: "",
  password: "",
});

const send = async (): Promise<void> => {
  try {
    const result = await ($api as any)("login", {
      method: "post",
      body: {
        email: form.email,
        password: form.password,
      },
    });
    console.log(result);
  } catch (error: any) {
    console.log(error);
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
      </div>
      <div>
        <BaseInputLabel>password</BaseInputLabel>
        <BaseTextInput
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
        ></BaseTextInput>
      </div>
      <div class="flex justify-end">
        <BasePrimaryButton type="submit">login</BasePrimaryButton>
      </div>
    </form>
  </NuxtLayout>
</template>
