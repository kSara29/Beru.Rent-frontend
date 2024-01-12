
<template>
    <v-app>
        <v-sheet :width="1100">      
        <UploadMultiPhotoVue />
        <AdFormVue />
        <router-view />
    </v-sheet>

    </v-app>
</template>
<script>
import AdFormVue from "@/components/Forms/AdForm.vue";
import UploadMultiPhotoVue from "@/components/Forms/UploadMultiPhoto.vue";
export default {
    name:'App',
    components:{
        AdFormVue,
        UploadMultiPhotoVue
    }
};
</script>