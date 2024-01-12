<template>
    <v-parallax height="600" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
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
      <v-col cols="12" md="6" lg="4" v-for="item in paginatedItems" :key="item.id">
        <router-link :to="{ name: 'DetailPage', params: { id: item.id }}" class="no-underline">
          <v-card class="mx-auto">
            <v-img
              :src="item.image"
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
  data() {
    return {
      items: [],
      currentPage: 1,
      itemsPerPage: 10,
      selectedCategory: 'All',
      categories: ['All','Computer', 'Gloves', 'Ball', 'Soap', 'Bike', 'Table'],
      selectedSort: 'Сначала последние',
      sortOptions: ['Сначала последние', 'По цене (убывание)', 'По цене (возрастание)']
    };
  },
  computed: {
    filteredItems() {
      if (!this.selectedCategory || this.selectedCategory === 'All') {
        return this.items;
      }
      return this.items.filter(item => item.category === this.selectedCategory);
    },
    sortedItems() {
      let itemsToSort = [...this.filteredItems];
      return itemsToSort.sort((a, b) => {
        switch (this.selectedSort) {
          case 'Сначала последние':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'По цене (убывание)':
            return parseFloat(b.price) - parseFloat(a.price);
          case 'По цене (возрастание)':
            return parseFloat(a.price) - parseFloat(b.price);
          default:
            return 0; // в случае отсутствия сортировки
        }
      });
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedItems.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedItems.length / this.itemsPerPage);
    }
  },
  created() {
    axios.get('https://659f92975023b02bfe89e55f.mockapi.io/api/mock/ad')
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }
};
</script>

<style>
  .v-img__img{
    height: 60%!important;
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
</style>
