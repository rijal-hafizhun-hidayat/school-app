<script setup lang="ts">
import type {
  StudentFetch,
  StudentWithClassSchool,
} from "~/interface/StudentInterface";
import type { Validation } from "~/server/model/validation-model";

const { $api } = useNuxtApp();
const router = useRouter();
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<Validation | null> = ref(null);
const students: Ref<StudentWithClassSchool[]> = ref([]);
const { data, error } = await useApi<StudentFetch>("student");

if (data.value) {
  students.value = data.value.data as StudentWithClassSchool[];
} else {
  console.log(error.value);
}

const studentCreateView = (): void => {
  router.push({
    name: "student-create",
  });
};

const studentShowView = (studentId: number): void => {
  router.push({
    name: "student-studentId",
    params: {
      studentId: studentId,
    },
  });
};

const destroyStudentByStudentId = async (studentId: number): Promise<void> => {
  try {
    const result: StudentFetch = await $api(`student/${studentId}`, {
      method: "delete",
    });
    Sweetalert.successAlert(result.statusMessage);
    students.value = students.value.filter(
      (student) => student.id !== studentId
    );
  } catch (error: any) {
    const err = error.data as Validation;
    validation.value = err;
    if (validation.value.statusCode !== 400) {
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
            student
          </h2>
        </div>
        <div>
          <BasePrimaryButton @click="studentCreateView" type="button"
            >add student</BasePrimaryButton
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
              <th class="pb-4 pt-6 px-6">Nama Siswa</th>
              <th class="pb-4 pt-6 px-6">Kelas</th>
              <th class="pb-4 pt-6 px-6">Dibuat Tanggal</th>
              <th class="pb-4 pt-6 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody v-if="students.length > 0">
            <tr
              v-for="(student, index) in students"
              :key="student.id"
              class="hover:bg-gray-100"
            >
              <td class="border-t items-center px-6 py-4">
                {{ index + 1 }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ student.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ student.class_school.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ Timestamp.formatTimestamp(student.created_at) }}
              </td>
              <td
                class="border-t items-center px-6 py-4 flex justify-start space-x-4"
              >
                <div>
                  <BasePrimaryButton
                    @click="studentShowView(student.id)"
                    :disabled="isLoading"
                    type="button"
                    >Ubah</BasePrimaryButton
                  >
                </div>
                <div>
                  <BaseDangerButton
                    @click="destroyStudentByStudentId(student.id)"
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
