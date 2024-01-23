<template>
    <div>
      <p>Completing login...</p>
    </div>
  </template>

  <script>
  import userManager from '@/scripts/oidcConfig';

  export default {
    name: 'Callback',
    mounted() {
      userManager.signinRedirectCallback().then(() => {
        this.$router.replace({ path: '/' }); // Redirect to home or desired route
      });
    },
  };
  </script>