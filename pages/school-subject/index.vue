<script setup lang="ts">
import type {
  SchoolSubject,
  SchoolSubjectFetch,
} from "~/interface/SchoolSubjectInteface";
import type { Validation } from "~/server/model/validation-model";

definePageMeta({
  middleware: ["auth-middleware"],
});

const isLoading: Ref<boolean> = ref(false);
const schoolSubjects: Ref<SchoolSubject[]> = ref([]);
const { $api } = useNuxtApp();
const validation: Ref<Validation | null> = ref(null);
const router = useRouter();
const { data, error } = await useApi<SchoolSubjectFetch>("school-subject");
if (data.value) {
  schoolSubjects.value = data.value.data as SchoolSubject[];
} else {
  console.log(error.value);
}

const schoolSubjectCreateView = (): void => {
  router.push({
    name: "school-subject-create",
  });
};

const schoolSubjectShowView = (schoolSubjectId: number): void => {
  router.push({
    name: "school-subject-schoolSubjectId",
    params: {
      schoolSubjectId: schoolSubjectId,
    },
  });
};

const destroySchoolSubjectBySchoolSubjectId = async (
  schoolSubjectId: number
): Promise<void> => {
  try {
    const result: SchoolSubjectFetch = await $api(
      `school-subject/${schoolSubjectId}`,
      {
        method: "delete",
      }
    );
    Sweetalert.successAlert(result.statusMessage);
    schoolSubjects.value = schoolSubjects.value.filter(
      (schoolSubject) => schoolSubject.id !== schoolSubjectId
    );
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
            school subject
          </h2>
        </div>
        <div>
          <BasePrimaryButton @click="schoolSubjectCreateView" type="button"
            >add school subject</BasePrimaryButton
          >
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <table class="w-full whitespace-nowrap">
          <thead>
            <tr class="text-left font-bold">
              <th class="pb-4 pt-6 px-6">#</th>
              <th class="pb-4 pt-6 px-6">Name School Subject</th>
              <th class="pb-4 pt-6 px-6">Created at</th>
              <th class="pb-4 pt-6 px-6">Action</th>
            </tr>
          </thead>
          <tbody v-if="schoolSubjects.length > 0">
            <tr
              v-for="(SchoolSubject, index) in schoolSubjects"
              :key="SchoolSubject.id"
              class="hover:bg-gray-100"
            >
              <td class="border-t items-center px-6 py-4">
                {{ index + 1 }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ SchoolSubject.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ Timestamp.formatTimestamp(SchoolSubject.created_at) }}
              </td>
              <td
                class="border-t items-center px-6 py-4 flex justify-start space-x-4"
              >
                <div>
                  <BasePrimaryButton
                    @click="schoolSubjectShowView(SchoolSubject.id)"
                    :disabled="isLoading"
                    type="button"
                    >update</BasePrimaryButton
                  >
                </div>
                <div>
                  <BaseDangerButton
                    @click="
                      destroySchoolSubjectBySchoolSubjectId(SchoolSubject.id)
                    "
                    :disabled="isLoading"
                    type="button"
                    >destroy</BaseDangerButton
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>
