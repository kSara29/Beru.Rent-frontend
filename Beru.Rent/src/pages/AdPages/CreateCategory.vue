<template></template>
<script>

axios.post('http://localhost:5174/bff/ad/create', requestBody, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.user.access_token}`
    }
  }).then(response => console.log(response));
  </script>