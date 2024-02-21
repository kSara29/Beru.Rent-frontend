<template>
  <div>
    <h2>Logging out...</h2>
  </div>
</template>

<script>
export default {
  mounted() {
    this.logout();
  },
  methods: {
    async logout() {
      try {
        // Clear local storage
        window.localStorage.clear();

        // Clear cookies
        const cookies = document.cookie.split("; ");
        for (let c of cookies) {
          const [name, _] = c.split("=");
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

        // Clear user state in Vuex store
        this.$store.commit('clearState');

        // Redirect the user to the login page
        // Change the route to your login page route
        window.location.href = "/";

        // Initiate signout redirect
        await this.$userManager.signoutRedirect();
      } catch (error) {
        console.error('Logout failed', error);
        // Handle logout failure, e.g., display error message
      }
    }
  }
};
</script>

