<template>
  <v-sheet max-width="300px" max-height="100px">
    <v-file-input
      v-model="loadingImage"
      :rules="imageLoadRules"
      accept="image/png, image/jpeg, image/bmp"
      label="Выбрите картинку"
    ></v-file-input>
    <v-btn @click="sender()">Click me</v-btn>
  </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      imageLoadRules: [
        value => !!value || 'выберите картинку',
        value => value[0].size < 10000000 || 'Фотография не должна весит больше 10МБ!'
      ],
      loadingImage: ''
    }),
    methods: {
      sender() {
        let formData = new FormData();
        for (let file of this.loadingImage) {
          formData.append("picture", file, file.Name)
        }
        console.log(formData.get("picture"))
      }
    }
  }
</script>
