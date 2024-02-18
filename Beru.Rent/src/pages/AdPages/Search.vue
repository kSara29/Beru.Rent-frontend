<template>
  <v-row>
    <v-col cols="12" md="6" lg="4" v-for="(item, index) in ads" :key="index">
      <Ad :ad="item" />
    </v-col>
  </v-row>
</template>
<script>
  import axios from 'axios'
  import Ad from "@/components/Ad.vue";
  export default {
    components: {
      Ad
    },
    data: () => ({
      ads: []
    }),
    methods: {
      getAds(item, category){
        if (item !== undefined && category !== undefined) {
          axios.get(`http://localhost:5174/bff/ad/getMainPageFindAds?finder=${item}&categoryName=${category}&page=1`)
            .then((response) => {
              this.ads = response.data.mainPageDto;
            })
        } else if (item !== undefined && category === undefined){
          axios.get(`http://localhost:5174/bff/ad/getMainPageFindAds?finder=${item}&page=1`)
            .then((response) => {
              this.ads = response.data.data.mainPageDto;
            });
        } else {
          axios.get(`http://localhost:5174/bff/ad/getMainPageFindAds?categoryName=${category}&page=1`)
            .then(response => this.ads = response.data.data.mainPageDto);
        }
      }
    },
    mounted() {

        this.getAds(this.$route.query.finder);
    }
  }
</script>
