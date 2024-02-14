<template>
    <div>
      <p>Completing login...</p>
    </div>
  </template>

<script>

export default {
  created() {
 
    this.$userManager.signinRedirectCallback().then(user => {
      if (user) {
        console.log('Redirect callback successful. User:', user);
        this.$router.push('/'); 
      }
    });
  },
};
</script>