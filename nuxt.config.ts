// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["nuxt-auth-utils", "@pinia/nuxt"],
  css: [
    "~/assets/css/main.css",
    "sweetalert2/dist/sweetalert2.min.css",
    "vue-multiselect/dist/vue-multiselect.css",
  ],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
