
<template>
    <v-app>
        <v-container>
        <v-sheet :width="1100"> 
        <UploadMultiPhotoVue />
        <AdFormVue />
        <SubmitBtn />
        <router-view />
    </v-sheet>
</v-container>
    </v-app>
</template>
<script>
import AdFormVue from "@/components/Forms/AdForm.vue";
import UploadMultiPhotoVue from "@/components/Forms/UploadMultiPhoto.vue";
import SubmitBtn from "@/components/Forms/SubmitBtn.vue";

export default {
    name:'App',
    components:{
        AdFormVue,
        UploadMultiPhotoVue,
        SubmitBtn
    }
};
</script>