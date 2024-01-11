
import AdFormVue from '@/components/Forms/AdForm.vue';

import AdFormVue from '@/components/Forms/AdForm.vue';

import AdFormVue from '@/components/Forms/AdForm.vue';
<template>
    <v-app>
        <AdFormVue />
        <router-view />

    </v-app>
</template>
<script>
import AdFormVue from "@/components/Forms/AdForm.vue";
export default {
    name:'App',
    components:{
        AdFormVue
    };
}
</script>