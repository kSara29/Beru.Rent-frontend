<template>
  <v-card width="100%" class="ad">
    <img
      v-if="ad.files && ad.files[0] !== null"
      class="custom-img"
      :src="'data:image/jpeg;base64,' + ad.files[0]"
      alt="Ad Image"
    />
    <img
      v-else
      class="custom-img"
      src="./item-empty.png"
      alt="Empty Item Image"
    />

    <v-card-title primary-title>
      <div>
        <h3 class="text headline mb-0" style="font-size:28px;">{{ ad.title }}</h3>
        <div class="text" style="font-size:18px;"> {{ ad.price }}₸/{{ ad.timeUnit.title }}</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="orange">
        <router-link style="text-decoration: none; color: inherit" :to="'details/' + adId" class="text">Смотреть</router-link>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [
    'ad'
  ],
  data: () => ({
    adId: '',
    file: '',
  }),
  mounted() {
    this.adId = this.ad.id;
    console.log(this.ad)
  }
}
</script>

<style scoped>
  .text{
    font-family: "Comfortaa", sans-serif;
    font-style: normal;
  }
  .ad{
    margin-left: 50px;
    margin-bottom: 20px;
  }
  .custom-img {
    width: 100%;
    height: 300px;
  }
</style>
