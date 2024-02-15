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
        if (item !== '' && category !== '') {
          axios.get(`http://localhost:5174/bff/ad/getMainPageFindAds?finder=${item}&categoryName=${category}`)
            .then((response) => {
              console.log(response.data.data);
              this.ads = response.data;
              console.log(this.ads);
            })
        } else if (item !== '' && category !== ''){
          axios.get(`http://localhost:5174/bff/ad/getMainPageFindAds?finder=${item}`)
            .then(response => this.ads = response.data.data);
        } else {
          axios.get(`http://localhost:5174/bff/ad/getMainPageFindAds?categoryName=${category}`)
            .then(response => this.ads = response.data.data);
        }
      }
    },
    mounted() {
      console.log(this.$route.query.finder);
      console.log(this.$route.query.categoryName);
        this.getAds(this.$route.query.finder);
    }
  }
</script>
