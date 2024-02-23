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
        <v-list-item @click="change(deal)" class="align-items-center rounded" link v-for="deal in myDeals" prepend-icon="mdi-exclamation" :title="'От: ' + deal.id" :subtitle="'Сумма: '"></v-list-item>
      </v-list>
    </div>

    <button @click="rotate('icon-arrow-from-me')" class="d-inline-flex align-items-center rounded my-btn" data-bs-toggle="collapse" data-bs-target="#from-me" aria-expanded="false" aria-current="false">
      <v-icon id="icon-arrow-from-me" icon="mdi-arrow-right-bold"></v-icon> Сделки от меня
    </button>
    <div class="collapse" id="from-me" style="">
      <v-list class="list-styled fw-normal pb-1 small">
        <v-icon icon=""></v-icon>
        <v-list-item @click="change(deal)" class="align-items-center rounded" link v-for="deal in deals" prepend-icon="mdi-exclamation" :title="'От: ' + deal.id" :subtitle="'Сумма: '"></v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
  <v-navigation-drawer width="1100">
    <div class="chat-messages" v-if="currentDeal">
      <Chat :chatId="currentDeal.chatId" />
    </div>
  </v-navigation-drawer>
  <v-navigation-drawer :width="400">
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div v-if="this.currentDeal.isMy === true">
      <v-btn @click="action(true)" :width="250" stacked outlined class="ml-3">Закрыть сделку</v-btn> <br/> <br/>
    </div>
    <div v-if="this.currentDeal.isMy === false">
      <v-btn @click="getContract()" :width="250" stacked outlined class="ml-3">Перейти к договору</v-btn> <br/> <br/>
    </div>
    <v-btn to="" :width="250" stacked outlined class="ml-3">
      <router-link to="" style="text-decoration: none; color: red; text-align: center">Пожаловаться на пользователя.</router-link>
    </v-btn> <br/> <br/>
    <v-btn to="" :width="250" stacked outlined class="ml-3">
      <router-link to="" style="text-decoration: none; color: red;">Перейти к профилью пользователя</router-link>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
 //import Chat from '@/components/Forms/ChatComponent.vue'
import Chat from "@/pages/Chat/Chat.vue";
export default {
  computed:{
    userToken() {
      return this.$store.getters.getUser;
    }
  },
  data:() => ({
    user: '',
    deals: [],
    myDeals: [],
    currentDeal: ''
  }),
  methods: {
    async getDeals() {
      await axios.get('http://localhost:5174/bff/deal/GetAllDeals/?id=c698dfc2-61a9-46eb-bf7f-0ffb2067b9bd', {
        headers: {
          'Authorization': `Bearer ${this.userToken.access_token}`
        }
      })
        .then(response => {
          response.data.data.dealPageDto.forEach((element) => element.isMy = false);
          this.deals = response.data.data.dealPageDto;
          console.log(this.deals);
        })
      await axios.get('http://localhost:5174/bff/deal/GetAllTenantDeals/?id=c698dfc2-61a9-46eb-bf7f-0ffb2067b9bd', {
        headers: {
          'Authorization': `Bearer ${this.userToken.access_token}`
        }
      })
        .then(response => {
          response.data.data.dealPageDto.forEach((element) => element.isMy = true);
          this.myDeals = response.data.data.dealPageDto;
          this.currentDeal = response.data.data.dealPageDto[0];
          console.log(this.myDeals);
          console.log(this.currentDeal);
        });
    },
    rotate(id) {
      let arrow = document.getElementById(id);
      arrow.classList.toggle('rot');
    },
    getContract(){
      window.location.href = `https://localhost:3000/doc/${this.currentDeal.id}`
    },
    action(isTrue) {
      if (isTrue === false) {

      } else {

      }
    },
    change(deal) {
      this.currentDeal = deal;
      console.log(deal);
      console.log(this.currentDeal);
      console.log(this.currentDeal.chatId);
    }
  },
  mounted() {
    this.getDeals()
    console.log(this.currentDeal)
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
