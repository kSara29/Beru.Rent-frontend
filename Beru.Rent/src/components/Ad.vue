<script setup>

</script>

<template>
  <v-card width="30%" class="ad">
    <v-img
      :src="'data:image/jpeg;base64,' + this.ad.files[0]"
      aspect-ratio="1"
    ></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ad.title}}</h3>
        <div> {{ ad.price }}₸/{{ad.timeUnit.title}} </div>
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
    props: [
      'ad'
    ],
    data:() => ({
      adId: 'hello world',
      file: '',
    }),
    mounted() {
      console.log(this.ad)
    }
  }
</script>

<style scoped>
.ad{
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>
