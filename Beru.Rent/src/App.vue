<template>
    <v-app>
        <Navbar />
        <br/>
        <div class="col-md-3"></div>
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
