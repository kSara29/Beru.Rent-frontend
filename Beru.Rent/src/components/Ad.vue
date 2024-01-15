<script setup>

</script>

<template>
  <v-card width="30%" class="ad">
    <v-img
      src="https://ir.ozone.ru/s3/multimedia-f/c1000/6326194971.jpg"
      aspect-ratio="1"
    ></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">рандомная вещь</h3>
        <div> Крутая вещь </div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat="" color="orange">
        <router-link style="text-decoration: none; color: inherit" :to="'details/' + this.adId">Детальная страница</router-link>
      </v-btn>
      <v-btn flat="" color="orange">
        <router-link style="text-decoration: none; color: inherit" to="">Забронировать</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data:() => ({
      adId: 'hello world'
    })
  }
</script>

<style scoped>
.ad{
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>
