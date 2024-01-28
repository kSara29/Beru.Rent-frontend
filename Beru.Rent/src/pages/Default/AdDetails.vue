<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="12" md="7">
        <v-container v-if="itemData">
          <p class="display-6">{{itemData.title }}</p>
        </v-container>
        <v-carousel hide-delimiters style="height: 500px;">
          <v-carousel-item
            v-for="(image, index) in carouselImages"
            :key="index"
            :src="image"
            contain
          ></v-carousel-item>
        </v-carousel>

        <v-container v-if="itemData">
          <h5>Описание товара</h5>
          <p>{{ itemData.description }}</p>
        </v-container>

        <v-container>
          <v-btn style="background-color: darkslategrey; color: white">Показать номер</v-btn>
          <v-btn style="background-color: #0d194d; color: white; margin-left: 30px">Написать</v-btn>
        </v-container>
      </v-col>

      <v-col cols="12" md="5">
        <v-container>
          <p>Выберите период аренды:</p>
          <v-container class="rentPeriod align-center" style="padding: 0px">
            <v-container class="d-flex align-center justify-content-around rentSubCon">
              <p :class="{'text-grey': switchValue}">посуточная</p>
              <v-switch
                color="primary"
                v-model="switchValue"
                style="width: 50px; padding-left: 60px"
              ></v-switch>
              <p :class="{'text-grey': !switchValue}">почасовая</p>
            </v-container>

            <v-container class="d-flex rentDatePeriod">
              <template v-if="!switchValue">
                <DadataView :key="`dadata-${reRenderTrigger}`" :myParam="parentData"/>
              </template>

              <template v-else>
                <v-container style="padding: 0px">
                  <DadataView :key="`dadata-${reRenderTrigger}`" :myParam="parentData"/>
                  <v-text-field variant="solo"></v-text-field>
                  <v-text-field variant="solo"></v-text-field>
                </v-container>
              </template>
            </v-container>

            <v-container v-if="itemData">
              <p>Аренда ------------------------ {{itemData.price}}</p>
            </v-container>
          </v-container>
        </v-container>

        <v-container>
          <v-container class="rentPeriod align-center" style="padding: 0px">
            <v-container class="d-flex align-center justify-content-around rentSubCon">
              <p :class="{'text-grey': switchValueDelivery}">Самовывоз</p>
              <v-switch
                color="primary"
                v-model="switchValueDelivery"
                style="width: 50px; padding-left: 60px"
              ></v-switch>
              <p :class="{'text-grey': !switchValueDelivery}">Доставка</p>
            </v-container>

            <v-container class="d-flex rentDatePeriod" v-if="itemData">
              <template v-if="!switchValueDelivery">
                <v-container style="background-color: #9b9c9e; border-radius: 15px; margin-bottom: 30px">
                  <p>Адрес товара: {{itemData.addressExtra.country}}, {{itemData.addressExtra.city}}, {{itemData.addressExtra.street}},
                  {{itemData.addressExtra.house}}</p>
                </v-container>
              </template>

              <template v-else>
                <v-container>
                  <v-container style="padding: 0px">
                    <v-text-field v-model="userInput" label="Адрес доставки" variant="solo"></v-text-field>
                  </v-container>
                  <v-container style="padding: 0px">
                    <v-text-field label="Подъезд" variant="solo"></v-text-field>
                    <v-text-field label="квартира" variant="solo"></v-text-field>
                  </v-container>
                </v-container>
              </template>
            </v-container>
          </v-container>
        </v-container>

      </v-col>
      <div id="yandexMap" style="width: 100%; height: 50%"></div>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import DadataView from "@/components/AddressSuggestions/DadataView.vue";

export default {
  components:{
    DadataView
  },
  data() {
    return {
      itemData: null,
      itemId: null,
      carouselImages: [],
      switchValue: false,
      menu: false,
      switchValueDelivery: false,
      userInput: '',
      inputTimeout: null,
      date: new Date('2018-03-02'),
      parentData: '',
      dadataKey: 0,
      reRenderTrigger: 0,
    };
  },
  created() {
    this.itemId = this.$route.params.id;
    this.fetchItemData();
  },
  watch: {
    userInput(newValue) {
      if (this.inputTimeout) clearTimeout(this.inputTimeout);

      this.inputTimeout = setTimeout(() => {
        this.sendDataToBackend(newValue);
      }, 500);
    },
    switchValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.dadataKey++; // Увеличиваем ключ для перерисовки компонента DadataView
      }
    },
  },
  methods: {
    fetchItemData() {
      const itemId = this.$route.params.id;
      axios.get(`https://localhost:7196/api/ad/get/${itemId}`)
        .then(response => {
          this.itemData = response.data.data;
          this.prepareCarouselImages(this.itemData.files);
          this.parentData = response.data.data.id
         /* console.log(response.data.data)
          console.log(this.itemData.addressExtra)*/
          console.log(this.parentData)

          ymaps.ready(() => {
            // eslint-disable-next-line no-unused-vars
            var map = new ymaps.Map("yandexMap", {
              center: [this.itemData.addressExtra.latitude, this.itemData.addressExtra.longitude], // Координаты центра карты
              zoom: 17 // Уровень масштабирования
            });
          });
        })
        .catch(error => {
          console.error('Ошибка при загрузке данных товара:', error);
        });
    },
    prepareCarouselImages(byteArray) {
      this.carouselImages = byteArray.map(byteArray => `data:image/jpeg;base64,${byteArray}`);
    },
    sendDataToBackend(query) {
      axios.post('https://localhost:7196/api/address/suggestions', { Query: query })
        .then(response => {
          console.log('Response from backend:', response.data);
        })
        .catch(error => {
          console.error('Ошибка при отправке данных:', error);
        });
    },
    toggleSwitch() {
      this.switchValue = !this.switchValue; // или каким-то другим образом изменяете состояние свитча
      this.dadataKey++; // увеличиваем ключ для перерисовки
      this.reRenderTrigger++;
    },
  }
};

</script>

<style scoped>
.v-carousel__controls {
  top: 50%; /* Центрируем по вертикали */
  transform: translateY(-50%)
  }
  .d-flex{
    margin-top: 50px;
  }
  .text-grey {
    color: grey;
  }
  .rentPeriod{
    background-color: #edf2ef;
    border-radius: 15px;
    margin: 0px;
  }
  .rentSubCon{
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 0px;
  }
  .rentDatePeriod{
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 0px;
  }
</style>
