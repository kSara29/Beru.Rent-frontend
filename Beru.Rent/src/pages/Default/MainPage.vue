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
      item-text="title"
      item-value="id"
      label="Выберите категорию"
      solo
      variant="outlined"
      class="category">
    </v-select>

    <v-btn
      v-for="option in sortOptions"
      style="margin-bottom: 30px; margin-right: 10px;"
       :key="option.value"
       :color="selectedSort === option.value ? 'blue' : 'default'"
        @click="selectSortOption(option.value)">
        {{ option.label }}
    </v-btn>

    


    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(item, index) in items" :key="index">
        <Ad :ad="item" />
      </v-col>
    </v-row>

    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      circle
    ></v-pagination>
    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from 'axios'
import Ad from '@/components/Ad.vue'
export default {
  data:() => ({
    overlay: false,
    items: [],
    currentPage: 1,
    selectedCategory: '',
    categories: [],
    selectedSort: 'fromnew',
    sortOptions: ['fromnew', 'fromold', 'fromhigh', 'fromlow'],
    totalPages: 0,
    sortOptions: [
    { label: 'Цена по убыванию', value: 'fromhigh' },
    { label: 'Цена по возрастанию', value: 'fromlow' },
    { label: 'От новых к старым', value: 'fromnew' },
    { label: 'От старых к новым', value: 'fromold' }
  ]
  }),
  watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
  methods: {
      selectSortOption(optionValue) {
        this.selectedSort = optionValue;
      },
      get() {
        axios.get('http://localhost:5174/bff/category/get')
          .then(response => 
          this.categories = response.data.data);
      },
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

      console.log(params);
      this.overlay = true
      axios.get('http://localhost:5174/bff/ad/getMainPageAds', { params })
          .then(response => {
            this.items = response.data.data.mainPageDto;
            console.log(this.items);
            this.totalPages = response.data.data.totalPage;
            console.log(response.data.data)
          })
          .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
          })
          .finally(() => {
        this.overlay = false; 
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
  },
  components: {
    Ad
  },
    mounted() {
      this.get()
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
