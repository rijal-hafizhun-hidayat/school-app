<script setup lang="ts">
import type {
  StudentFetch,
  StudentForm,
  StudentWithClassSchool,
} from "~/interface/StudentInterface";
import Multiselect from "vue-multiselect";
import type {
  ClassSchool,
  ClassSchoolFetch,
} from "~/interface/ClassSchoolInterface";
import { BaseInputLabel } from "#components";
import type { Validation } from "~/server/model/validation-model";

definePageMeta({
  middleware: ["auth-middleware"],
});

const classSchools: Ref<ClassSchool[]> = ref([]);
const router = useRouter();
const route = useRoute();
const isLoading: Ref<boolean> = ref(false);
const { $api } = useNuxtApp();
const validation: Ref<Validation | null> = ref(null);
const form: StudentForm = reactive({
  name: "",
  class_school: null,
});
const { data: classSchoolsData, error: classSchoolsError } =
  await useApi<ClassSchoolFetch>("class-school");
if (classSchoolsData.value) {
  classSchools.value = classSchoolsData.value.data as ClassSchool[];
  console.log(classSchools.value);
} else {
  console.log(classSchoolsError.value);
}
const { data: studentData, error: studentError } = await useApi<StudentFetch>(
  `student/${route.params.studentId}`
);
if (studentData.value) {
  const student = studentData.value.data as StudentWithClassSchool;
  form.name = student.name;
  form.class_school = student.class_school;
} else {
  console.log(studentError.value);
}

const send = async (): Promise<void> => {
  try {
    const result: StudentFetch = await $api(
      `student/${route.params.studentId}`,
      {
        method: "put",
        body: {
          name: form.name,
          class_school_id: form.class_school!.id,
        },
      }
    );

    Sweetalert.successAlert(result.statusMessage);
    router.push({
      name: "student",
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
            Add Student
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
            <BaseInputLabel>kelas</BaseInputLabel>
            <Multiselect
              :close-on-select="true"
              :clear-on-select="true"
              :disabled="isLoading"
              class="block mt-1 w-full"
              v-model="form.class_school"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name"
              track-by="id"
              :options="classSchools"
              :multiple="false"
              :taggable="false"
            ></Multiselect>
            <BaseInputError
              v-if="
                validation &&
                validation.statusCode === 400 &&
                validation.data.class_school
              "
              :message="validation.data.class_school[0]"
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
