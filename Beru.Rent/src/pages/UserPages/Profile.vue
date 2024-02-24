<script setup>

</script>

<template>
  <div class="col-md-3"></div>
      <v-card color="#FFCA28" height="350px">
        <div style="display: flex;height: 100%;justify-content: center;">
          <div class="profile-main text" style="display: flex;align-content: stretch;flex-direction: column;align-items: center;">
            <div>
              <img :src=this.avatar alt="Фото Юзера" style="border-radius: 50%;width:225px; height:225px; padding-top:20px">
              <p class="user-info-title">{{ user.firstName }} {{ user.lastName }} </p>
            </div>
            <div style="display:flex">
              <p class="user-info">{{user.mail}}</p>
              <p class="user-info user-phone" style="padding-left: 30px">+7{{user.phone}}</p>
            </div>
          </div>
        </div>
      </v-card>

      <div style="margin:0px; padding:0px">
        <v-container>
          <v-btn v-if="isUser" :to="'/profile/notifications/' + this.user.userId">
            <router-link style="text-decoration: none; color: inherit;" to="/profile/notifications/">Уведомления</router-link>
          </v-btn>
          <v-btn >
            <router-link style="text-decoration: none; color: inherit;" :to="'allChats'">Чаты</router-link>
          </v-btn>
          <v-btn @click="toggleGreeting">
            <p >Сделки</p>
          </v-btn>
          <v-btn >
            <router-link style="text-decoration: none; color: inherit;" :to="'allChats'">Бронирования</router-link>
          </v-btn>
        </v-container>

        <v-container v-if="showGreeting" class="mt-3">
          <v-row justify="center">
            <v-col cols="12">
              <v-card>
                <v-card-text>
                  <h2>Deals list - Coming soon ...</h2>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="main-text" style="display:flex; justify-content:center">
          Мои объявления
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(value, index) in ads" :key="index"
                    style="margin-top:20px;">
              <Ad :ad="value" />
            </v-col>
          </v-row>
        </v-container>
      </div>
</template>

<script>
import axios from 'axios'
import Ad from '@/components/Ad.vue'
export default{
  computed: {
    userToken() {
      return this.$store.getters.getUser;
    }
  },
  data:() => ({
    user: '',
    avatar: '../../../public/fish.jpg',
    image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18cfdf075ca%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18cfdf075ca%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2299.91666412353516%22%20y%3D%2296.20000038146972%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    isUser: true,
    ads: [],
    showGreeting: false
  }),
  methods: {
    toggleGreeting() {
      this.showGreeting = !this.showGreeting; // Переключение состояния блока с надписью "ПРИВЕТ"
    },
    async get() {
      await axios.get(`http://localhost:5174/bff/user/getById`, {headers: {
        'accept': 'application/json',
        'Content-Type': '*/*',
        'Authorization': `Bearer ${this.userToken.access_token}`
      }})
        .then(response => {
          console.log(response.data)
          if (response.data.errors !== null){
            alert("срок вашего токена истекла");
            window.location.href = '/logout';
          }
          else {
            this.user = response.data.data
          }
        });

      await axios.get(`http://localhost:5174/bff/ad/getAllAdsByUserId?id=${this.user.userId}`, {headers: {
          'accept': 'application/json',
          'Content-Type': '*/*',
          'Authorization': `Bearer ${this.userToken.access_token}`
        }})
        .then(response => this.ads = response.data.data);
    }
  },
  mounted() {
    this.get();
  },
  components: {
    Ad
  },
}
</script>

<style scoped>
  .ads row{
    display: flex!important;
  }
  .user-info {
    color: black;
    font-size:18px;
  }
  .user-info-title{
    color: black;
    padding-top:20px;
    font-size:25px;
  }
  .contacts {
    margin-left: 70%;
    display: block;
    margin-top: -160px;
  }

  .profile-main{
    margin-left: 50px;
  }
  .main-text {
    font-family: "Comfortaa", sans-serif;
    font-size:40px;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  .sub-text {
    font-family: "Comfortaa", sans-serif;
    font-size: 25px;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }
  .text{
    font-family: "Comfortaa", sans-serif;
    font-size:15px;
    font-style: normal;
  }
</style>
