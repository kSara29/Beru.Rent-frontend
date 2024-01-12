<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="12" md="8">
        <v-container v-if="itemData">
          <p class="display-6">{{itemData.title}}</p>
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

      <v-col cols="12" md="4">
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
                <v-text-field variant="solo"></v-text-field>
                <v-text-field variant="solo"></v-text-field>
              </template>

              <template v-else>
                <v-container>
                  <v-text-field variant="solo"></v-text-field>
                  <v-text-field variant="solo"></v-text-field>
                </v-container>
                <v-container>
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
                  <p>Адрес доставки: {{itemData.city}}, {{itemData.street}}</p>
                </v-container>
              </template>

              <template v-else>
                <v-container>
                  <v-container style="padding: 0px">
                    <v-text-field label="Адрес доставки" variant="solo"></v-text-field>
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

        <v-container v-if="itemData">
          <v-container style="background-color: #803306; border-radius: 15px;
          padding: 5px; color: white">
            <p class="display-6">Итого {{itemData.price}}</p>
          </v-container>
          <v-container>
            <v-btn size="x-large" style="background-color: #ed68a4; border-radius: 15px">
              Запросить аренду</v-btn>
          </v-container>
        </v-container>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        itemData: null,
        itemId: null,
        carouselImages: [],
        switchValue: false,
        menu: false,
        switchValueDelivery: false
      };
    },
    created() {
      this.itemId = this.$route.params.id;
      this.fetchItemData();
    },
    methods: {
      fetchItemData() {
        const itemId = this.$route.params.id;
        axios.get(`https://659f92975023b02bfe89e55f.mockapi.io/api/mock/ad/${itemId}`)
          .then(response => {
            this.itemData = response.data;
            this.prepareCarouselImages(this.itemData.image);
          })
          .catch(error => {
            console.error('Ошибка при загрузке данных товара:', error);
          });
      },
      prepareCarouselImages(imageUrl) {
        this.carouselImages = [imageUrl, imageUrl, imageUrl];
      }
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
