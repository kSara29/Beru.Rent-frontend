
<template>
  <v-container fluid>

  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
    scroll-behavior="hide"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-app-bar-title>
      <v-btn prepend-icon="$vuetify">
        <router-link to="/" style="text-decoration: none; color: inherit">Beru-Rent</router-link>
      </v-btn>
    </v-app-bar-title>

    <!-- Поисковик -->
    <v-btn icon>
      <v-icon @click="search()">mdi-magnify</v-icon>
    </v-btn>

    <v-text-field
      hide-details
      single-line
      v-model="searchItem"
    ></v-text-field>

    <!-- Категория -->
    <v-app-bar-title style="align-self: self-start">
      <v-select
        clearable
        label="Категория"
        :items="categories"
        v-model="category"
      ></v-select>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <div v-if="!user" class="ml-3">

    <!-- Регистрация -->
    <v-btn to="/register" stacked outlined class="ml-3" >
      <router-link to="/register" style="text-decoration: none; color: inherit" >Регистрация</router-link>
    </v-btn>

   <!-- Логин -->
    <v-btn stacked outlined class="ml-3" >
      <button style="text-decoration: none; color: inherit" @click="login">ВОЙТИ</button>
    </v-btn>
  </div>

    <div v-if="user" class="ml-3">
    <!-- Список уведомлении -->
    <v-btn to="/profile/notifications/c698dfc2-61a9-46eb-bf7f-0ffb2067b9bd">
      <v-icon icon="mdi-bell" style="text-decoration: none; color: inherit"></v-icon>
    </v-btn>
    <!-- Создание объявления -->
    <v-btn to="/createad" stacked outlined class="ml-3" >
      <router-link to="/createad" style="text-decoration: none; color: inherit">Создать объявление</router-link>
    </v-btn>
    <!--button @click="logout">Выйти</button-->
    <v-btn to="/logout" stacked outlined class="ml-3" >
      <router-link to="/logout" style="text-decoration: none; color: inherit">
        <v-icon icon="mdi-login"></v-icon>
        Выйти</router-link>
    </v-btn>
    <!-- Личный кабинет -->
    <v-btn to="/profile" stacked outlined class="ml-3" >
      <router-link to="/profile" style="text-decoration: none; color: inherit">Личный кабинет</router-link>
    </v-btn>

    </div>

  </v-app-bar>
  </v-container>
    <br/>
  </template>

  <script>
  import axios from "axios";

  export default {
    data:() => ({
      searchItem: '',
      category: '',
      categories: []
    }),
    methods:{
      login() {
        this.$userManager.signinRedirect();
      },
      search(){
        if (this.category !== '' && this.searchItem !== ''){
          window.location.href = `https://localhost:3000/search/${this.category}/${this.searchItem}`
        }
        else if (this.searchItem !== '' && this.category === '') {
          window.location.href = `https://localhost:3000/searchItem/${this.searchItem}`
        }
        else if (this.searchItem === '' && this.category !== ''){
          window.location.href = `https://localhost:3000/searchCategory/${this.category}`
        } else {
          window.location.href = `https://localhost:3000/`
        }
      },
      get() {
        axios.get('http://localhost:5174/bff/category/get')
          .then(response => this.categories = response.data.data);
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      },
      log() {
        console.log(this.$user)
      }
    },
    mounted() {
      this.get()
    }
  }
  </script>

  <style scoped>

  </style>
