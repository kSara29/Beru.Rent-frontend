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
    <v-icon>mdi-magnify</v-icon>
  </v-btn>

  <v-text-field
    hide-details
    single-line
  ></v-text-field>

  <!-- Категория -->
  <v-app-bar-title style="align-self: self-start">
    <v-select
      clearable
      label="Категория"
      :items="['Спорт', 'Электроника', 'Инструменты', 'Спецтехника', 'Транспорт', 'Недвижимость']"
    ></v-select>
  </v-app-bar-title>

  <v-spacer></v-spacer>

  <!-- Создание объявления -->
  <v-btn stacked outlined class="ml-3" >
    <router-link to="/createad" style="text-decoration: none; color: inherit" >Создание объявления</router-link>
  </v-btn>

  <!-- Регистрация -->
  <v-btn  stacked outlined class="ml-3" >
    <router-link to="/register" style="text-decoration: none; color: inherit" >Регистрация</router-link>
  </v-btn>

  <v-btn stacked outlined class="ml-3" >
    <router-link to="/profile" style="text-decoration: none; color: inherit">Личный кабинет</router-link>
  </v-btn>
  <v-btn stacked outlined class="ml-3" >
    <router-link to="/test" style="text-decoration: none; color: inherit">Логин</router-link>
  </v-btn>

  <div>
    <div v-if="user">
      <p>Привет, {{ user.profile.name }}!</p>
      <button @click="logout">Выйти</button>
    </div>
    <div v-else>
      <p><button @click="login">Войти</button></p>
    </div>
  </div>

  <!-- Выход из аккаунт(после входа в аккаунт появляется) -->
  <v-btn stacked>
    <v-icon icon="mdi-login"></v-icon>
    Выход
  </v-btn>

</v-app-bar>
</v-container>
  <br/>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
  
    },
    logout() {
      this.$userManager.signoutRedirect();
    },
  },

}
</script>

<style scoped>

</style>
