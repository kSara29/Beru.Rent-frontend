<template>
  <v-navigation-drawer :width="400">
    <v-list-item title="Мои уведомления"></v-list-item>
    <v-divider></v-divider>
    <!-- Заявки на бронирования к юзеру -->
    <button @click="rotate('icon-arrow-my')" class="d-inline-flex align-items-center rounded my-btn" data-bs-toggle="collapse" data-bs-target="#to-me" aria-expanded="false" aria-current="false">
      <v-icon id="icon-arrow-my" icon="mdi-arrow-right-bold"></v-icon> Мои бронирования
    </button>
    <div class="collapse" id="to-me" style="">
      <v-list class="list-unstyled fw-normal pb-1 small">
        <v-icon icon=""></v-icon>
        <v-list-item class="align-items-center rounded invisible-item" link v-for="not in myNotifications" prepend-icon="mdi-exclamation" :title="'Владелец: ' + not.ownerName" :subtitle="'Сумма: '
        + not.cost" @click="getAd(not)"></v-list-item>
      </v-list>
    </div>

    <!-- Заявки на бронирование от юзера -->
    <button @click="rotate('icon-arrow-from-me')" class="d-inline-flex align-items-center rounded my-btn" data-bs-toggle="collapse" data-bs-target="#from-me" aria-expanded="false" aria-current="false">
      <v-icon id="icon-arrow-from-me" icon="mdi-arrow-right-bold"></v-icon> Заявки на бронирования
    </button>
    <div class="collapse" id="from-me" style="">
      <v-list class="list-unstyled fw-normal pb-1 small">
        <v-icon icon=""></v-icon>
        <v-list-item class="align-items-center rounded invisible-item" link v-for="not in notifications" prepend-icon="mdi-exclamation" :title="'От: ' + not.tenantName" :subtitle="'Сумма: '
        + not.cost" @click="getAd(not)"></v-list-item>
      </v-list>
    </div>

    <!-- Диспуты -->
    <button @click="rotate('icon-arrow-from-me')" class="d-inline-flex align-items-center rounded my-btn" data-bs-toggle="collapse" data-bs-target="#from-me" aria-expanded="false" aria-current="false">
      <v-icon id="icon-arrow-from-me" icon="mdi-arrow-right-bold"></v-icon> Споры
    </button>
    <div class="collapse" id="from-me" style="">
      <v-list class="list-unstyled fw-normal pb-1 small">
        <v-icon icon=""></v-icon>
        <v-list-item class="align-items-center rounded invisible-item" link v-for="dispute in disputes" prepend-icon="mdi-exclamation" :title="'От: ' + not.tenantName" :subtitle="'Сумма: '
        + dispute.cost" @click="getAd(disputes)"></v-list-item>
      </v-list>
    </div>

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
      <v-btn :to="'/details/' + this.ad.id" :width="350" stacked outlined class="ml-3">
      <router-link :to="'/details/' + this.ad.id" style="text-decoration: none; color: red;">Перейти к объявлению</router-link>
    </v-btn>
    <div v-if="this.currentNot.bookingState === 'InQueue'">
      <v-btn v-if="showApproveBtn" @click="answer(true)" :width="350" stacked outlined class="ml-3">Подтвердить</v-btn> <br/> <br/>
      <v-btn @click="answer(false)" :width="350" stacked outlined class="ml-3">Отменить</v-btn> <br/> <br/>
    </div>
    <div v-if="this.currentNot.bookingState === 'Accept'">
      <v-btn to="/user/deals" :width="350" stacked outlined class="ml-3">Перейти на страницу мои сделки</v-btn> <br/> <br/>
    </div>
    </div>
  </v-navigation-drawer>
  <v-navigation-drawer :width="550">
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> <br/>

  </v-navigation-drawer>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    userToken() {
      return this.$store.getters.getUser;
    }
  },
  data:() => ({
    notifications: [],
    myNotifications: [],
    dialog: false,
    user: '',
    ad: '',
    today: new Date(),
    displayFiles: ['https://picsum.photos/1920/1080?random'],
    currentNot: '',
    disputes: '',
    showApproveBtn:false
  }),
  methods: {
    async getAd(not) {
      axios.get(`http://localhost:5174/bff/ad/getById?id=${not.adId}`)
        .then(response => {
          this.ad = response.data.data;
          console.log("Объявление: " + this.ad.userId);
          console.log("Юзер Id: " + this.userToken.profile.sub);

          if(this.ad.userId == this.userToken.profile.sub){
            this.showApproveBtn = true;
            console.log("Показать кнопку? " + this.showApproveBtn);
          }
          this.prepareCarouselImages(this.ad.files)
        })
      this.currentNot = not;
    },
    async getAllNotifications() {
      await axios.get(`http://localhost:5174/bff/user/getById`, {
        headers: {
          'accept': 'application/json',
          'Content-Type': '*/*',
          'Authorization': `Bearer ${this.userToken.access_token}`
        }
      })
        .then(response => {
          if (response.data.errors !== null) {
            alert('Срок вашего токена истекла!');
            window.location.href = '/logout';
          } else {
            this.user = response.data.data;
          }
        });

      await axios.get(`http://localhost:5174/bff/booking/getalltenantbookings`, {
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userToken.access_token}`
        }
      })
        .then((response) => {
          this.myNotifications = response.data.data.dealPageDto;
          this.getAd(response.data.data.dealPageDto[0])
        });

      await axios.get(`http://localhost:5174/bff/booking/getallbookings`, {
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userToken.access_token}`
        }
      }).then((response) => {
        this.notifications = response.data.data.dealPageDto;
        this.getAd(response.data.data.dealPageDto[0])
      });

      /*await axios.get(`http://localhost:5174/bff/dispute/getalldisputes/?id=${this.user.userId}`, {
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userToken.access_token}`
        }
      }).then((response) => {
        this.disputes = response.data.data;
      });*/
    },
    prepareCarouselImages(byteArray) {
      this.displayFiles = byteArray.map(byteArray => `data:image/jpeg;base64,${byteArray}`);
    },
    answer(isTrue) {
      console.log(this.currentNot);
      axios.post("http://localhost:5174/bff/deal/create",
        {
          bookingId: this.currentNot.id,
          isApproved: isTrue,
          ownerId: this.currentNot.ownerId
        }).then(response => console.log(response.data));
    },
    rotate(id) {
      let arrow = document.getElementById(id);
      arrow.classList.toggle('rot');
    },
  },
  mounted() {
    this.getAllNotifications();
  }
}
</script>

<style scoped>
.my-btn {
  border: none;
  background-color: inherit;
  padding: 14px 28px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
}
.rot {
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-transition: transform 1s ease-in-out;
  transition: transform 1s ease-in-out;
}
</style>
