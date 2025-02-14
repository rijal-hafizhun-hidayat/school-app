<script setup lang="ts">
import type {
  ClassSchool,
  ClassSchoolFetch,
  ClassSchoolForm,
} from "~/interface/ClassSchoolInterface";
import type { Validation } from "~/server/model/validation-model";

definePageMeta({
  middleware: ["auth-middleware"],
});

const { $api } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<Validation | null> = ref(null);
const form: ClassSchoolForm = reactive({
  name: "",
});
const { data, error } = await useApi<ClassSchoolFetch>(
  `class-school/${route.params.classSchoolId}`
);

if (data.value) {
  const classSchool = data.value.data as ClassSchool;
  form.name = classSchool.name;
} else {
  console.log(error.value);
}

const send = async (): Promise<void> => {
  try {
    isLoading.value = true;
    const result: ClassSchoolFetch = await $api(
      `class-school/${route.params.classSchoolId}`,
      {
        method: "put",
        body: {
          name: form.name,
        },
      }
    );

    Sweetalert.successAlert(result.statusMessage as string);
    router.push({
      name: "class-school",
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
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            class school
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
