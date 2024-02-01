<template>
  <div class="autocomplete-wrapper v-field__input">
    <AutoComplete
      v-model="searchQuery"
      :suggestions="suggestions"
      @complete="search"
      placeholder="Адрес доставки"
    />
  </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';
import axios from 'axios';

export default {
  components: {
    AutoComplete
  },
  data() {
    return {
      searchQuery: '',
      suggestions: [],
    };
  },
  methods: {
    search(query) {
      axios.post('http://localhost:5105/api/address/suggestions', { Query: query.query }).then(response => {
        this.suggestions = response.data;
        console.log(this.suggestions);
      }).catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
    }
  }
};

</script>

<style>
.autocomplete-wrapper {
  background-color: white;
  margin-bottom: 20px;
  height: 50px;
  border-style: none;
}
.p-autocomplete-panel {
  background-color: white;
  opacity: 1;
}
.p-autocomplete-input{
  width: 370px;
  padding-left:15px;
}
</style>
