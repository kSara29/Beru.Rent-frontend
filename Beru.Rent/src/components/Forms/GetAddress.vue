<template>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="submitAddress">
        <v-text-field
          v-model="address"
          :rules="rules"
          label="Введите адрес"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Подтвердить</v-btn>
      </v-form>
  
      <!-- Display address information -->
      <v-card v-if="addressInfo" class="mt-4">
        <v-card-title>Проверьте адрес</v-card-title>
        <v-card-text>
          <div>Страна: {{ addressInfo.country }}</div>
          <div>Город: {{ addressInfo.city }}</div>
          <div>Улица: {{ addressInfo.street }}</div>
          <div>Дом: {{ addressInfo.building }}</div>
          <div>Latitude: {{ addressInfo.lat }}</div>
          <div>Longitude: {{ addressInfo.lon }}</div>
        </v-card-text>
      </v-card>
    </v-sheet>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        address: '',
        rules: [
          value => {
            if (value) return true
            return 'Пожалуйста введите адрес.'
          },
        ],
        addressInfo: null,
      };
    },
    methods: {
      submitAddress() {
        // Prepare the API URL with the input address
        const apiUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=5570fbc5-a3de-4dd6-9158-221866f70379&geocode=${this.address}`;
  
        // Send the request using Axios
        axios.get(apiUrl)
          .then(response => {
            // Parse XML response
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, 'text/xml');
  
            // Extract address information from XML
            const country = xmlDoc.getElementsByTagName('CountryName')[0].textContent;
            const city = xmlDoc.getElementsByTagName('LocalityName')[0].textContent;
            const street = xmlDoc.getElementsByTagName('ThoroughfareName')[0].textContent;
            const building = xmlDoc.getElementsByTagName('PremiseNumber')[0].textContent;
            const pos = xmlDoc.getElementsByTagName('pos')[0].textContent.split(' ');
  
            // Update addressInfo
            this.addressInfo = {
              country: country,
              city: city,
              street: street,
              building: building,
              lat: pos[1],
              lon: pos[0]
            };
          })
          .catch(error => {
            // Handle errors here
            console.error('Error fetching data:', error);
          });
      }
    }
  };
  </script>
  