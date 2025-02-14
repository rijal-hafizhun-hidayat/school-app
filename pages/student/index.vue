<script setup lang="ts">
import type {
  ClassSchool,
  ClassSchoolFetch,
} from "~/interface/ClassSchoolInterface";
import type {
  ClassSchoolSearch,
  StudentFetch,
  StudentWithClassSchool,
} from "~/interface/StudentInterface";
import type { Validation } from "~/server/model/validation-model";
import Multiselect from "vue-multiselect";

const { $api } = useNuxtApp();
const router = useRouter();
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<Validation | null> = ref(null);
const students: Ref<StudentWithClassSchool[]> = ref([]);
const classSchools: Ref<ClassSchool[]> = ref([]);
const { data: dataStudents, error: errorStudents } = await useApi<StudentFetch>(
  "student"
);
if (dataStudents.value) {
  students.value = dataStudents.value.data as StudentWithClassSchool[];
} else {
  console.log(errorStudents.value);
}
const { data: dataClassSchool, error: errorClassSchool } =
  await useApi<ClassSchoolFetch>("class-school");
if (dataClassSchool.value) {
  classSchools.value = dataClassSchool.value.data as ClassSchool[];
} else {
  console.log(errorClassSchool.value);
}
const search: ClassSchoolSearch = reactive({
  class_school: null,
});

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

const searchStudents = async (): Promise<void> => {
  try {
    const result = await $api("student", {
      method: "get",
      params: {
        search: search.class_school?.id,
      },
    });
    console.log(result);
  } catch (error: any) {
    const err = error.data as Validation;
    validation.value = err;
    if (validation.value.statusCode !== 400) {
      Sweetalert.errorAlert(validation.value.statusMessage);
    }
  }
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
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md">
        <form @submit.prevent="searchStudents" class="flex space-x-5">
          <div class="w-full">
            <Multiselect
              :close-on-select="true"
              :clear-on-select="true"
              :disabled="isLoading"
              class="block mt-1 w-full"
              v-model="search.class_school"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name"
              track-by="id"
              :options="classSchools"
              :multiple="false"
              :taggable="false"
            ></Multiselect>
          </div>
          <div class="my-auto">
            <BasePrimaryButton type="submit">search</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>

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
