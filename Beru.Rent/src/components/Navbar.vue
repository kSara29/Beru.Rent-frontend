<template>
    <v-container fluid>
        <v-app-bar
            color="black"
            dark
        >
            <v-spacer/>
            <v-btn outlined class="ml-3">
                <router-link to="/">Главная страница</router-link>
            </v-btn>
            <v-btn outlined class="ml-3">
                <router-link to="/register">Регистрация</router-link>
            </v-btn>
        </v-app-bar>
    </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>