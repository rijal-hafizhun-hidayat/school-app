export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession();

  console.log(loggedIn.value);
  console.log(user.value);

  if (!loggedIn.value && !user.value) {
    return navigateTo("/");
  }
});
