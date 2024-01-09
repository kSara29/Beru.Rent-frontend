<template>
    <v-app>
        <Navbar />
        <br/>
        <router-view />
    </v-app>
</template>
<script>
    import Navbar from "@/components/Navbar.vue";

    export default{
        name: 'App',
        components: {
            Navbar
        }
    };
</script>