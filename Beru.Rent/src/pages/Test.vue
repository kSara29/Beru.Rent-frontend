<template>
  <div>
    <button @click="login">Login</button>
  </div>
</template>

<script>

export default {
    methods: {
    login() {
      this.$userManager.signinRedirect();
    },
    logout() {
      this.$userManager.signoutRedirect();
    },
  },
};


</script>
