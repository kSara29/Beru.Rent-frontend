<template>
    <v-app>
        <Navbar />
        <br/>
        <br/>
        <LoadPicture />
        <router-view />
    </v-app>
</template>
<script>
    import Navbar from "@/components/Navbar.vue";
    import LoadPicture from "@/components/Forms/LoadPicture.vue";

    export default{
        name: 'App',
        components: {
            Navbar,
            LoadPicture
        }
    };
</script>
