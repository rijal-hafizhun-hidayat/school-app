<script setup lang="ts">
import type {
  ClassSchool,
  ClassSchoolFetch,
} from "~/interface/ClassSchoolInterface";

definePageMeta({
  middleware: ["auth-middleware"],
});

const router = useRouter();
const { $api } = useNuxtApp();
const classSchools: Ref<ClassSchool[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const { data, error } = await useApi<ClassSchoolFetch>("class-school");
if (!error.value) {
  classSchools.value = data.value?.data as ClassSchool[];
} else {
  console.log(error.value);
}

const classSchoolCreateView = (): void => {
  router.push({
    name: "class-school-create",
  });
};

const destroyClassSchoolByClassSchoolId = async (
  classSchoolId: number
): Promise<void> => {
  try {
    const result: ClassSchoolFetch = await $api(
      `class-school/${classSchoolId}`,
      {
        method: "delete",
      }
    );
    Sweetalert.successAlert(result.statusMessage);
    classSchools.value = classSchools.value.filter(
      (classSchool) => classSchool.id !== classSchoolId
    );
  } catch (error) {
    console.log(error);
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
        <div>
          <BasePrimaryButton @click="classSchoolCreateView" type="button"
            >add class school</BasePrimaryButton
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
              <th class="pb-4 pt-6 px-6">Nama kelas</th>
              <th class="pb-4 pt-6 px-6">Dibuat Tanggal</th>
              <th class="pb-4 pt-6 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="classSchools.length > 0">
            <tr
              v-for="(classSchool, index) in classSchools"
              :key="classSchool.id"
              class="hover:bg-gray-100"
            >
              <td class="border-t items-center px-6 py-4">
                {{ index + 1 }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ classSchool.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ Timestamp.formatTimestamp(classSchool.created_at) }}
              </td>
              <td
                class="border-t items-center px-6 py-4 flex justify-start space-x-4"
              >
                <div>
                  <BasePrimaryButton :disabled="isLoading" type="button"
                    >Ubah</BasePrimaryButton
                  >
                </div>
                <div>
                  <BaseDangerButton
                    @click="destroyClassSchoolByClassSchoolId(classSchool.id)"
                    :disabled="isLoading"
                    type="button"
                    >Hapus</BaseDangerButton
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
