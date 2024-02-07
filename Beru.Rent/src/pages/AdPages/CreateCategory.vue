<template>
    <h3>Создать категорию</h3>

    <form @submit.prevent="submitForm">
      <label for="title">Название категории:</label>
      <input type="text" id="title" v-model="title" required>
  
      <label for="parentId">Id родителькой категории:</label>
      <input type="text" id="parentId" v-model="parentId" >
  
      <button type="submit">Создать</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    computed:{
    user() {
      return this.$store.getters.getUser;
    }
    },
    data() {
      return {
        title: '',
        parentId: ''
      };
    },
    methods: {
      submitForm() {
        const requestBody = {
          title: this.title,
          parentId: this.parentId
        };
  
        axios.post('http://localhost:5174/bff/category/create', requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.user.access_token}`
          }
        }).then(response => console.log(response))
        .catch(error => console.error(error));
      }
    }
  };
  </script>
  