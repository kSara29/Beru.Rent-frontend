<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="12" md="8">
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
      </v-col>

      <v-col cols="12" md="4">
        <v-container>
          <p>Выберите период аренды:</p>
          <v-container class="rentPeriod" style="padding: 0px">
            <v-container class="d-flex align-center">
              <p :class="{'text-grey': switchValue}">посуточная</p>
              <v-switch
                color="primary"
                v-model="switchValue"
              ></v-switch>
              <p :class="{'text-grey': !switchValue}">почасовая</p>
            </v-container>
<!--            <v-row justify="space-around">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <v-date-picker
                  v-model="date"
                  min="2016-06-15"
                  max="2030-12-21"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-row>-->
            <v-date-picker
              min="2016-06-15"
              max="2030-12-21"
              style="max-width: 100%"
            ></v-date-picker>
          </v-container>
        </v-container>
      </v-col>

    </v-row>
  </v-container>

  <v-container>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      v-model:return-value="date"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          label="Picker in menu"
          prepend-icon="event"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
      </v-date-picker>
    </v-menu>
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
        switchValue: true,
        date: new Date().toISOString().substr(0, 10),
        menu: false
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
  }
</style>
