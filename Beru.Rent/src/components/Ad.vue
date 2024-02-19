<script setup>

</script>

<template>
  <v-card width="100%" class="ad">
    <!-- Conditional rendering for default image -->
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

    <!-- Card Title and Actions -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ ad.title }}</h3>
        <div>{{ ad.price }}₸/{{ ad.timeUnit.title }}</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="orange">
        <router-link style="text-decoration: none; color: inherit" :to="'details/' + adId">Смотреть</router-link>
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
    adId: '', // Инициализация без значения
    file: '',
  }),
  mounted() {
    // Установка значения adId из пропса ad при монтировании компонента
    this.adId = this.ad.id; // Предполагая, что у ad есть поле id
    console.log(this.ad)
  }
}
</script>

<style scoped>
.ad{
  margin-left: 50px;
  margin-bottom: 20px;
}
.custom-img {
  width: 100%; /* Adjust the width to fit the container */
  height: auto; /* Maintain aspect ratio */
}
</style>
