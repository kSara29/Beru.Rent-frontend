
<template>
  <v-app>
    <v-container>
    <v-sheet :width="1100">
      <UploadMultiPhotoVue />
        <br />
        <br />
        <AdFormVue />
        <SubmitBtn />
      </v-sheet>
    </v-container>
  </v-app>
  <v-btn @click="onSend()">Click me</v-btn>
</template>
<script>
import AdFormVue from "@/components/Forms/AdForm.vue";
import UploadMultiPhotoVue from "@/components/Forms/UploadMultiPhoto.vue";
import SubmitBtn from "@/components/Forms/SubmitBtn.vue";
import axios from "axios";
export default {
  data:() => ({
    user: '',
    files: UploadMultiPhotoVue.methods.getFiles,
    userData: AdFormVue.methods.getData
  }),
  components: {
      UploadMultiPhotoVue,
      AdFormVue,
      SubmitBtn,
  },
  methods: {
    onSend() {
      let data = this.userData()
      console.log(data)
      let form = {
        photos: this.files,
        user: this.userData
      }
      console.log(form)
    },
    get() {
      axios.get('http://localhost:5181/api/user/get', {params: {UserId: '7519daec-02a3-4382-970b-37704238dae9'}})
        .then(response => this.user = response.data)
    }
  },
  mounted() {
    this.get()
    this.onSend()
  }
};
</script>
