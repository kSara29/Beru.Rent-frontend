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
    <v-btn to="/" prepend-icon="$vuetify">
      <router-link class="router-link-btn" to="/">Beru-Rent</router-link>
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
  <v-btn to="/createad" stacked outlined class="ml-3" >
    <router-link class="router-link-btn" to="/createad">Создание объявления</router-link>
  </v-btn>

  <!-- Регистрация -->
  <v-btn to="/register" stacked outlined class="ml-3" >
    <router-link class="router-link-btn" to="/register">Регистрация</router-link>
  </v-btn>

  <v-btn to="/profile" stacked outlined class="ml-3" >
    <router-link class="router-link-btn" to="/profile">Личный кабинет</router-link>
  </v-btn>

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

}
</script>

<style scoped>
 .router-link-btn{
   text-decoration: none;
   color: inherit;
 }
</style>
