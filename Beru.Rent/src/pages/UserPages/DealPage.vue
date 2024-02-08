<script setup>

</script>

<template>
  <v-navigation-drawer width="200">
    <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
    <v-divider></v-divider>
    <v-list-item v-for="deal in deals" link :title="deal.userName" :subtitle="deal.adName"></v-list-item>
  </v-navigation-drawer>
  <v-navigation-drawer width="1100">

  </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
export default {
  data:() => ({
    user: '',
    deals:
      [
        {userName: 'Abdimansur', price: 585600, adId: "dd2349b5-f433-4b34-a327-3cf82b140688", adName: "Kagurabachi", chatId: "a165b9bb-5f8a-47de-9944-709371b4601b"},
        {userName: "admin", price: 292800, adId: "f64d046b-2c4e-456c-b94e-97494b079f78", adName: "Губка боб", chatId: "a165b9bb-5f8a-47de-9944-709371b4601b"}
      ],
  }),
  methods: {
    async getDeals() {
      await axios.get('http://localhost:5174/bff/deal/GetAllDeals/?id=c698dfc2-61a9-46eb-bf7f-0ffb2067b9bd')
        .then(response => console.log(response.data.data))
    }
  },
  mounted() {
    this.getDeals()
  }
}
</script>

<style scoped>

</style>
