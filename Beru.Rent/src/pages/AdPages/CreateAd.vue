<template>
  <v-app>
    <v-container>
      <v-sheet :width="1100">
        <v-form ref="adForm" @submit.prevent>
          <v-file-input
            v-model="files"
            color="deep-purple-accent-4"
            counter
            label="Добавьте фото"
            placeholder="Выбрать файлы"
            prepend-icon="mdi-image-multiple"
            accept="image/png, image/jpeg, image/bmp"
            multiple
            variant="outlined"
            :show-size="1000"
            @change="addFiles()">
          </v-file-input>
          <v-carousel hide-delimiters="">
            <v-carousel-item 
              v-for="(item) in displayFiles"
              :key="item.name"
              :src="item"
              cover=""
              height="200"
            ></v-carousel-item>
          </v-carousel>
          <v-btn @click="removeFile()">Удалить последнее фото</v-btn>
          <br/>
          <br/>
          <div class="form-group">
            <v-select
              variant="outlined"
              prepend-icon="mdi-go-kart"
              label="Выберите категорию"
              name="categoryId"
              :item-props="itemProps"
              v-model="categoryId"
              :items="categories">
            </v-select>
          </div>
          <div class="form-group">
            <v-text-field
              clearable
              variant="outlined"
              prepend-icon="mdi-text"
              v-model="title"
              name="title"
              label="Укажите название"
              :rules="titleRules"
              hide-details="auto">
            </v-text-field>
          </div>
          <br/>
          <div class="form-group">
            <v-textarea
              clearable
              variant="outlined"
              prepend-icon="mdi-text-long"
              v-model="description"
              name="description"
              label="Опишите товар"
              :rules="descriptionRules"
              hide-details="auto">
            </v-textarea>
          </div>
          <br/>
          <div class="form-group">
            <v-text-field
              clearable
              variant="outlined"
              prepend-icon="mdi-exclamation"
              v-model="extraConditions"
              name="extraConditions"
              label="Дополнительные условия"
              :rules="conditionRules"
              hide-details="auto">
            </v-text-field>
          </div>
          <div class="form-group">
            <v-checkbox
              prepend-icon="mdi-credit-card-outline"
              v-model="deposit"
              name="deposit"
              label="Требуется ли залог?"
              hide-details="auto">
            </v-checkbox>
          </div>
          <div class="form-group" v-if="deposit">
            <v-text-field
              clearable
              variant="outlined"
              prepend-icon="mdi-cash-multiple"
              v-model="minDeposit"
              name="minDeposit"
              label="Минимальный залог"
              :rules="minimumDepositRules"
              hide-details="auto">
            </v-text-field>
          </div><br/>
          <div class="form-group">
            <v-select
              variant="outlined"
              prepend-icon="mdi-timer-sand"
              label="Минимальный промежуток времени для аренды"
              v-model="timeunitId"
              name="timeunitId"
              :item-props="itemProps"
              :items="timeunit">
            </v-select>
          </div>
          <div class="form-group">
            <v-text-field
              clearable
              variant="outlined"
              prepend-icon="mdi-cash-multiple"
              v-model="price"
              name="price"
              label="Цена за единицу времени аренды (например за месяц)"
              :rules="priceRules"
              hide-details="auto">
            </v-text-field>
          </div>
          <br/>
          <div class="form-group">
            <v-select
              variant="outlined"
              prepend-icon="mdi-file-sign"
              label="Тип контракта"
              name="contractTypeId"
              :items="contracts"
              @update:modelValue="setContractType($event)">
            </v-select>
          </div>
          <div class="form-group">
            <div class="autocomplete-wrapper v-field__input">
    <v-text-field
      clearable
      variant="outlined"
      prepend-icon="mdi-map-marker"
      v-model="searchQuery"
      name="searchQuery"
      label="Введите адрес одной строкой"
      :rules="address"
      hide-details="auto"
      @input="handleInput"
      placeholder="Введите адрес"
    ></v-text-field>

    <ul v-if="showSuggestions" class="suggestions-list">
      <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
        {{ suggestion.title.text }}, {{ suggestion.subtitle.text }}
      </li>
    </ul>


    <!-- Display address information -->
    <v-card v-if="addressInfo" class="mt-4">
      <v-card-title>Информация об адресе</v-card-title>
      <v-card-text>
        <div>Страна: {{ addressInfo.country }}</div>
        <div>Регион: {{ addressInfo.region }}</div>
        <div>Город: {{ addressInfo.city }}</div>
        <div>Улица: {{ addressInfo.street }}</div>
        <div>Здание: {{ addressInfo.building }}</div>
        <div>Почтовый: {{ addressInfo.postindex }}</div>
        <div>Latitude: {{ addressInfo.lat }}</div>
        <div>Longitude: {{ addressInfo.lon }}</div>
      </v-card-text>
    </v-card>
  </div>
          </div>
          <br />
          <v-btn @click="sendForm()" type="submit">Создать объявление</v-btn>
        </v-form>
      </v-sheet>
    </v-container>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  data() {
    return {
      searchQuery: '',
      suggestions: [],
      showSuggestions: false,
      typingTimeout: null,
      selectedSuggestion: null,
      addressInfo: null,

      files: [],
      displayFiles: [],
      title: '',
      titleRules: [
        value => !!value || 'Название обязательно',
        value => value.length < 30 || 'Название не должно быть больше 30 символов',
        value => value.length > 3 || 'Название должно содержать хотя бы 3 букв'
      ],
      description: '',
      descriptionRules: [
        value => !!value || 'Описание обязательно',
        value => value.length > 50 || 'Описнаие должна содержать более 50 символов!'
      ],
      extraConditions: '',
      conditionRules: [],
      addressString: '',
      address: [
        value => !!value || 'Адрес обязателен'
      ],
      deposit: false,
      minDeposit: '',
      minimumDepositRules: [
        value => !!value || 'Введите сумму минимального залога'
      ],
      price: '',
      priceRules: [
        value => {
          const pattern = /^[0-9]{0,100}$/
          return pattern.test(value) || "Цена может содержать только цифры!"
        }
      ],
      categoryId: '',
      categories: [],
      contractTypeId: '',
      contracts: ['Недвижимость', 'Движимое имущество'],
      timeunitId: '',
      timeunit: ''
    }
  },
  methods: {
    handleInput() {
      clearTimeout(this.typingTimeout);
      if (this.searchQuery.length >= 5) {
        this.typingTimeout = setTimeout(this.fetchSuggestions, 2000);
      } else {
        this.suggestions = [];
        this.showSuggestions = false;
      }
    },
    fetchSuggestions() {
      const apiUrl = `https://suggest-maps.yandex.ru/v1/suggest?apikey=8abf69e1-ed41-498f-af8e-e2f3b86fadc4&text=${encodeURIComponent(this.searchQuery)}`;
      axios.get(apiUrl)
        .then(response => {
          this.suggestions = response.data.results;
          this.showSuggestions = true;
        })
        .catch(error => {
          console.error('Error fetching address suggestions:', error);
        });
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.title.text;
      this.selectedSuggestion = suggestion;
      this.suggestions = [];
      this.showSuggestions = false;
      this.submitAddress(suggestion.title.text); // Pass the selected address to submitAddress method
    },
    submitAddress(address) {
      const apiUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=5570fbc5-a3de-4dd6-9158-221866f70379&geocode=${address}`;

      axios.get(apiUrl)
        .then(response => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, 'text/xml');

          const country = xmlDoc.getElementsByTagName('CountryName')[0].textContent;
          const region = xmlDoc.getElementsByTagName('AdministrativeAreaName')[0].textContent;
          const city = xmlDoc.getElementsByTagName('LocalityName')[0].textContent;
          const street = xmlDoc.getElementsByTagName('ThoroughfareName')[0].textContent;
          const building = xmlDoc.getElementsByTagName('PremiseNumber')[0].textContent;
          const postindex = xmlDoc.getElementsByTagName('postal_code')[0].textContent;
          const pos = xmlDoc.getElementsByTagName('pos')[0].textContent.split(' ');

          this.addressInfo = {
            country: country,
            region: region,
            city: city,
            street: street,
            building: building,
            postindex: postindex,
            lat: pos[1],
            lon: pos[0]
          };
        })
        .catch(error => {
          console.error('Error fetching address information:', error);
        });
    },
    async sendForm() {
      const ans = await this.$refs.adForm.validate();
      if (ans.valid === false) {
        alert('Форма заполнена неправильно!');
        return;
      }

      // Create a new FormData object
      const formData = new FormData();

      // Append fields to the FormData object
      formData.append('userId', this.user.id);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('extraConditions', this.extraConditions);
      formData.append('neededDeposit', this.deposit);
      formData.append('minDeposit', parseInt(this.minDeposit));
      formData.append('price', parseInt(this.price));
      formData.append('categoryId', this.categoryId);
      formData.append('timeUnitId', this.timeunitId);
      formData.append('contractTypeId', parseInt(this.contractTypeId));
      formData.append('addressExtraId', '3fa85f64-5717-4562-b3fc-2c963f66afa6'); // Ensure correct value
      formData.append('addressExtra', this.addressString);
      formData.append('tags', 'bestSeller');

      // Append files to the FormData object
      this.files.forEach(file => {
        formData.append('files[]', file); // Assuming this.files is an array of File objects
      });

      // Now you can send this formData in your HTTP request
      axios.post('http://localhost:5174/bff/ad/create', formData,  {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.user.access_token}`
          }
        }).then(response => console.log(response))
        .catch(error => console.error(error))
    },
    async get() {
      await axios.get('http://localhost:5174/bff/timeunit/get')
        .then(response => this.timeunit = response.data.data);
      await axios.get('http://localhost:5174/bff/category/get')
        .then(response => this.categories = response.data.data);
    },
    removeFile() {
      this.displayFiles.splice(-1);
      this.files.splice(-1);
    },
    addFiles() {
      const length = this.files.length;
      for (let i = 0; i < length; i++) {
        this.displayFiles.push(URL.createObjectURL(this.files[i]))
      }
    },
    setContractType(value) {
      for (let i = 0; i < this.contracts.length; i++) {
        if (this.contracts[i] === value) {
          this.contractTypeId = i;
        }
      }
    },
    itemProps(item) {
      return {
        title: item.title,
        value: item.id
      }
    }
  },
  mounted() {
    this.get()
  },
};
</script>

