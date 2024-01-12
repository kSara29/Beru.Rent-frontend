<template>
  <v-container class="d-flex">
    <v-container>
      <v-carousel hide-delimiters show-arrows="hover" style="height: 500px;">
        <v-carousel-item
          v-for="(image, index) in carouselImages"
          :key="index"
          :src="image"
          contain
        ></v-carousel-item>
      </v-carousel>

      <v-container v-if="itemData">
        <h5>Описание товара</h5>
        <p>{{ itemData.description }}</p>
      </v-container>
    </v-container>

    <v-container>
      <h1>hello</h1>
    </v-container>
  </v-container>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        itemData: null,
        itemId: null,
        carouselImages: []
      };
    },
    created() {
      this.itemId = this.$route.params.id;
      this.fetchItemData();
    },
    methods: {
      fetchItemData() {
        const itemId = this.$route.params.id;
        axios.get(`https://659f92975023b02bfe89e55f.mockapi.io/api/mock/ad/${itemId}`)
          .then(response => {
            this.itemData = response.data;
            this.prepareCarouselImages(this.itemData.image);
          })
          .catch(error => {
            console.error('Ошибка при загрузке данных товара:', error);
          });
      },
      prepareCarouselImages(imageUrl) {
        this.carouselImages = [imageUrl, imageUrl, imageUrl];
      }
    }
  };
</script>

<style scoped>
  .v-carousel__controls {
    top: 50%; /* Центрируем по вертикали */
    transform: translateY(-50%)
  }
</style>
