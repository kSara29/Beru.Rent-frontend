<template>
  <v-navigation-drawer :width="400">
    <v-list-item title="Мои уведомления"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link v-for="not in notifications" :title="'От: ' + user.userName" :subtitle="'Сумма: ' + not.cost" @click="getAd(not.adId)"></v-list-item>
  </v-navigation-drawer>
  <v-navigation-drawer :width="800">
    <div class="card mb-3">
      <v-carousel hide-delimiters style="height: 500px;">
        <v-carousel-item
          v-for="(image, index) in displayFiles"
          :key="index"
          :src="image"
          contain
        ></v-carousel-item>
      </v-carousel>
      <div class="card-body">
        <h5 class="card-title">{{ad.title}}</h5>
        <p class="card-text">{{ad.description}}</p>
        <p class="card-text">Цена: {{ad.price}}</p>
        <p class="card-text"><small class="text-muted">{{today}}</small></p>
      </div>
    </div>
  </v-navigation-drawer>
  <v-navigation-drawer :width="550">
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <v-btn :width="350" stacked outlined class="ml-3">Подтвердить</v-btn> <br/> <br/>
    <v-btn :width="350" stacked outlined class="ml-3">Отказать</v-btn> <br/> <br/>
    <v-btn :width="350" stacked outlined class="ml-3">
      <router-link to="/profile/" style="text-decoration: none; color: red;">Перейти к профилью пользователья</router-link>
    </v-btn> <br/> <br/>
    <v-btn :width="350" stacked outlined class="ml-3">
      <router-link :to="'/details/' + this.ad.id" style="text-decoration: none; color: red;">Перейти к объявлению</router-link>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      notifications: [],
      dialog: false,
      user: '',
      ad: '',
      today: new Date(),
      displayFiles: ['https://picsum.photos/1920/1080?random']
    }
  },
  methods: {
    getAllNotifications(userId) {
      axios.post('http://localhost:5080/api/booking/getbookings/{id}', userId.toString(), {
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json'
        }
      })
        .then(response => this.notifications = response.data);

      axios.get(`http://localhost:5181/api/user/getById`, {params:{id: userId}, headers: {
          'accept': 'application/json',
          'Content-Type': '*/*'
        }})
        .then(response => this.user = response.data);
    },
    getAd(adId){
      console.log(this.ad)
      axios.get(`http://localhost:5105/api/ad/get/${adId}`, {headers: {
          'accept': 'application/json',
          'Content-Type': '*/*'
        }})
        .then(response => {
          this.ad = response.data.data;
          this.prepareCarouselImages(this.ad.files)
        });
    },
    prepareCarouselImages(byteArray) {
      this.displayFiles = byteArray.map(byteArray => `data:image/jpeg;base64,${byteArray}`);
    },
  },
  mounted() {
    this.getAllNotifications('18f363a3-1684-4323-a8c4-722a6c233f47');
  }
}
</script>
