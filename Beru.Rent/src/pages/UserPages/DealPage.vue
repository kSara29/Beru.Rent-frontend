<script setup>

</script>

<template>
  <v-navigation-drawer width="300">
    <v-list-item title="Мои сделки"></v-list-item>
    <v-divider></v-divider>
    <button @click="rotate('icon-arrow-my')" class="d-inline-flex align-items-center rounded my-btn" data-bs-toggle="collapse" data-bs-target="#to-me" aria-expanded="false" aria-current="false">
      <v-icon id="icon-arrow-my" icon="mdi-arrow-right-bold"></v-icon> Сделки со мной
    </button>
    <div class="collapse" id="to-me" style="">
      <v-list class="list-styled fw-normal pb-1 small">
        <v-icon icon=""></v-icon>
        <v-list-item @click="console.log(deal)" class="align-items-center rounded" link v-for="deal in myDeals" prepend-icon="mdi-exclamation" :title="'От: ' + deal.id" :subtitle="'Сумма: '"></v-list-item>
      </v-list>
    </div>

    <button @click="rotate('icon-arrow-from-me')" class="d-inline-flex align-items-center rounded my-btn" data-bs-toggle="collapse" data-bs-target="#from-me" aria-expanded="false" aria-current="false">
      <v-icon id="icon-arrow-from-me" icon="mdi-arrow-right-bold"></v-icon> Сделки от меня
    </button>
    <div class="collapse" id="from-me" style="">
      <v-list class="list-styled fw-normal pb-1 small">
        <v-icon icon=""></v-icon>
        <v-list-item class="align-items-center rounded" link v-for="deal in deals" prepend-icon="mdi-exclamation" :title="'От: ' + deal.id" :subtitle="'Сумма: '"></v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
  <v-navigation-drawer width="1100">
    <Chat />
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
import Chat from '@/components/Forms/ChatComponent.vue'
export default {
  data:() => ({
    user: '',
    deals: [],
    myDeals: []
  }),
  methods: {
    async getDeals() {
      await axios.get('http://localhost:5174/bff/deal/GetAllDeals/?id=c698dfc2-61a9-46eb-bf7f-0ffb2067b9bd')
        .then(response => this.deals = response.data.data.dealPageDto)
      await axios.get('http://localhost:5174/bff/deal/GetAllTenantDeals/?id=c698dfc2-61a9-46eb-bf7f-0ffb2067b9bd')
        .then(response => this.myDeals = response.data.data.dealPageDto);
    },
    rotate(id) {
      let arrow = document.getElementById(id);
      arrow.classList.toggle('rot');
    }
  },
  mounted() {
    this.getDeals()
  },
  components: {
    Chat
  }
}
</script>

<style scoped>
body {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}

body::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
.rot {
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-transition: transform 1s ease-in-out;
  transition: transform 1s ease-in-out;
}
.my-btn {
  border: none;
  background-color: inherit;
  padding: 14px 28px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
}
</style>
