export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: "/api",
    onRequest({ request, options, error }) {
      console.log(request);
    },
    onResponse({ response }) {
      console.log(response);
    },
    async onResponseError({ response }) {
      console.log(response);
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
