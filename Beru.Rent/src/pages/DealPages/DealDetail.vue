<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="bg-light-green white--text">Аренда успешно оформлена <v-icon>mdi-check-circle</v-icon></v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon>mdi-account</v-icon> <strong>Владелец:</strong> {{ dealInfo.ownerName }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon>mdi-calendar</v-icon> <strong>Дата начала аренды:</strong> {{ dealInfo.dateBegin }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon>mdi-calendar</v-icon> <strong>Дата окончания аренды:</strong> {{ dealInfo.dateEnd }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon>mdi-package-variant</v-icon> <strong>Название товара:</strong> {{ dealInfo.itemName }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon>mdi-link</v-icon> <a :href="dealInfo.itemLink">Смотреть объявление</a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon>mdi-currency-kzt</v-icon> <strong>Цена KZT:</strong> {{ dealInfo.priceKZT }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
  
            <v-card-actions>
                <router-link to="/chat">
              <v-btn color="primary">Начать чат <v-icon>mdi-chat</v-icon></v-btn>
            </router-link>
             <v-btn color="error">Возникла проблема <v-icon>mdi-alert</v-icon></v-btn>
             <v-btn @click="downloadContract" color="info">Скачать договор аренды <v-icon>mdi-file-download</v-icon></v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dealInfo: {
          ownerName: 'John Doe',
          dateBegin: '2024-02-01',
          dateEnd: '2024-02-15',
          itemName: 'Example Item',
          itemLink: 'https://example.com/item',
          priceKZT: '50000',
        },
      };
    },
  };
  </script>
  
  <style>
  .bg-light-green {
    background-color: #8bc34a; /* Light green color */
  }
  </style>
  