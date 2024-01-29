<template>
    <v-parallax height="600px!important" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <div class="slogan d-flex flex-column justify-center align-center text-white">
        <h1 class="text-h4 font-weight-thin mb-4">
          Взять вещи в аренду —
          просто, как раз-два-три
        </h1>
        <h5 class="font-weight-thin ">
          Некоторые вещи стоят довольно дорого, а используются только время от времени — так зачем покупать их, если можно взять в аренду?
        </h5>
        <h5 class="font-weight-thin ">
          Beru.Rent — простой и удобный сервис для аренды вещей с рейтингом, гарантией и многим другим.
        </h5>
      </div>
    </v-parallax>

  <v-container>
    <v-select
      v-model="selectedCategory"
      :items="categories"
      label="Выберите категорию"
      solo
      variant="outlined"
      class="category"
    ></v-select>

    <v-btn
      v-for="option in sortOptions"
      :key="option"
      :color="selectedSort === option ? 'blue' : 'default'"
      @click="selectedSort = option"
    >
      {{ option }}
    </v-btn>


    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="item in items" :key="item.id">
        <router-link :to="{ name: 'DetailPage', params: { id: item.id }}" class="no-underline">
          <v-card class="mx-auto">
            <v-img
              :src="dataUrl(item.files)"
              cover
            >
            </v-img>

            <v-card-title>
              {{ item.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ item.city }}
            </v-card-subtitle>

            <v-card-text>
              {{ item.description }}
            </v-card-text>
            <v-card-text>
              {{ item.price }}
            </v-card-text>
            <v-card-text>
              {{ item.category }}
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>

    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      circle
    ></v-pagination>

  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data:() => ({
    items: [],
    currentPage: 1,
    selectedCategory: 'all',
    categories: ['all','computer', 'cat', 'Ball', 'Soap', 'Bike', 'Table'],
    selectedSort: 'fromnew',
    sortOptions: ['fromnew', 'fromold', 'fromhigh', 'fromlow'],
    totalPages: 0
  }),
  methods: {
    fetchItems() {
      let params = {
        page: this.currentPage,
        cat: this.selectedCategory
      };

      if (['fromnew', 'fromold'].includes(this.selectedSort)) {
        params.sortdate = this.selectedSort;
        params.sortprice = null;
      } else if (['fromhigh', 'fromlow'].includes(this.selectedSort)) {
        params.sortprice = this.selectedSort;
        params.sortdate = null;
      }


      axios.get('http://localhost:5105/api/ad/get', { params })
          .then(response => {
            this.items = response.data.mainPageDto;
            this.totalPages = response.data.totalPage;
            console.log(response.data)
          })
          .catch(error => {
            console.error('Ошибка при загруз ке данных:', error);
          });
    },
    dataUrl(byteArray) {
      if (!byteArray || !Array.isArray(byteArray) || byteArray.length === 0) return '';


      return 'data:image/jpeg;base64,' + byteArray[0];
    },
  },
  created() {
    this.fetchItems();
  },
  watch: {
    currentPage() {
      this.fetchItems();
    },
    selectedCategory() {
      this.fetchItems();
    },
    selectedSort() {
      this.fetchItems();
    }
  }
};
</script>

<style>
  .v-img__img{
    height: 100%!important;
  }
  .slogan{
    margin-top: 250px;
  }
  .mx-auto{
    height: 550px;
    margin-top: 30px;
  }
  .category{
    width: 30%;
  }
  .no-underline {
    text-decoration: none;
  }
  .v-responsive{
    height: 50%!important;
  }
</style>
