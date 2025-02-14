<script setup lang="ts">
import type {
  SchoolSubjectFetch,
  SchoolSubjectForm,
} from "~/interface/SchoolSubjectInteface";
import type { Validation } from "~/server/model/validation-model";

definePageMeta({
  middleware: ["auth-middleware"],
});

const { $api } = useNuxtApp();
const router = useRouter();
const validation: Ref<Validation | null> = ref(null);
const isLoading: Ref<boolean> = ref(false);
const form: SchoolSubjectForm = reactive({
  name: "",
});

const send = async (): Promise<void> => {
  try {
    const result: SchoolSubjectFetch = await $api("school-subject", {
      method: "post",
      body: {
        name: form.name,
      },
    });

    Sweetalert.successAlert(result.statusMessage);
    router.push({
      name: "school-subject",
    });
  } catch (error: any) {
    const err = error.data as Validation;
    validation.value = err;

    if (validation.value.statusCode != 400) {
      Sweetalert.errorAlert(validation.value.statusMessage);
    }
  }
};
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            add school subject
          </h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <form @submit.prevent="send" class="space-y-5">
          <div>
            <BaseInputLabel>name</BaseInputLabel>
            <BaseTextInput
              type="text"
              class="mt-1 block w-full"
              v-model="form.name"
            />
            <BaseInputError
              v-if="
                validation &&
                validation.statusCode === 400 &&
                validation.data.name
              "
              :message="validation.data.name[0]"
            />
          </div>
          <div>
            <BasePrimaryButton :disabled="isLoading" type="submit"
              >submit</BasePrimaryButton
            >
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
