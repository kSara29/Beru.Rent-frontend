<template>
  <v-container>
  <v-alert
    density="compact"
    type="warning"
    title="Что-то пошло не так"
    text="Не получилось загрузить данные по этому объявлению. Проверьте, существует ли оно?"
  ></v-alert></v-container>

  <v-container class="d-flex">
    <v-row>
      <v-col cols="12" md="7">
        <v-container v-if="itemData">
          <p style="color: cadetblue; font-weight: bold;">Категория: {{itemData.category.title }}</p>
          <p class="display-6">{{itemData.title }}</p>
        </v-container>
        <v-carousel hide-delimiters style="height: 500px;">
          <v-carousel-item
            v-for="(image, index) in carouselImages"
            :key="index"
            :src="image"
            contain
          >
       </v-carousel-item>
        </v-carousel>

        <v-container v-if="itemData">
          <h5>Описание товара</h5>
          <p>{{ itemData.description }}</p>
        </v-container>
        <!--диалоговое окно--> 
              <v-container>
              
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="auto"
          >
            <v-card>
              <v-card-text>
                Ваше бронирование успешно отправлено.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">Ок</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-container>
          <!--диалоговое окно-->

        <v-container v-if="itemData && itemData.extraConditions">
          <h5>Особые требования</h5>
          <p>{{ itemData.extraConditions }}</p>
        </v-container>
        
        <v-container v-if="itemData">
  <h5>Нужен ли залог?</h5>
  <p>{{ itemData.neededDeposit ? 'Да' : 'Нет' }}</p>
</v-container>

<v-container v-if="itemData && itemData.neededDeposit">
  <h5>Стоимость залога</h5>
  <p>{{ itemData.minDeposit }} Тенге</p>
</v-container>

        <v-container v-if="itemData">
          <h5>Дата добавления</h5>
          <p>{{ itemData.createdAt }}</p>
        </v-container>

        <v-container>
          <v-btn @click="book()" style="background-color: #0d194d; color: white; margin-left: 0px; margin-top: 20px;">Оставить заявку на бронирование</v-btn>
        </v-container>
      </v-col>
<!--КАЛЕНДАРЬ-->


          <v-col cols="12" md="5">
        <v-container>
          <p>Выберите период аренды:</p>
          <v-container class="rentPeriod align-center" style="padding: 0px">


            <v-container class="d-flex rentDatePeriod">
              <template v-if="!switchValue">
                <DadataView @update:date="handleDateUpdate($event)" :key="`dadata-${reRenderTrigger}`" :myParam="parentData"/>
              </template>
            </v-container>

            <v-container v-if="itemData">
              <p>Аренда ------------------------ {{itemData.price}} Тенге в {{ itemData.timeUnit.title }}</p>
            
            </v-container>
            <v-container v-if="dBeg && dEnd">
                  <p>Выбранный период аренды:</p>
                  
                  <label for="timeBeg">Уточните время начала аренды:</label>
                  <input type="time" id="timeBeg" name="timeBeg" min="09:00" max="18:00" v-model="timeBeg" @change="updateTime('begin', $event)" required />
                  <p>Начало: {{ formatDate(dBeg) }} Время {{ timeBeg }}</p>
                  <hr>
                  
                  <label for="timeEnd">Уточните время окончания аренды:</label>
                  <input type="time" id="timeEnd" name="timeEnd" min="09:00" max="18:00" v-model="timeEnd" @change="updateTime('end', $event)" required />
                  <p>Конец: {{ formatDate(dEnd) }} Время {{ timeEnd }}</p>
                 <hr>
                 <v-continer>
                  
                <v-btn v-if="timeEnd&&timeBeg" @click="askForCost()">Рассчитать стоимость аренды</v-btn>
                <p v-if="bookCost"> Итоговая стоимость: {{ bookCost }} Тенге</p>
              </v-continer>
              </v-container>
              
          </v-container>
        </v-container>
        <v-container>
<!--КАЛЕНДАРЬ КОНЕЦ-->
        </v-container>

        <v-container>
          <v-container class="rentPeriod align-center" style="padding: 0px">
            <v-container class="d-flex align-center justify-content-around rentSubCon">
              <p :class="{'text-grey': switchValueDelivery}" prepend-icon="mdi-image-multiple">Самовывоз</p>
            </v-container>

            <v-container class="d-flex rentDatePeriod" v-if="itemData">
              <template v-if="!switchValueDelivery">
                <v-container style="background-color: #9b9c9e; border-radius: 15px; margin-bottom: 30px">
                  <p>Адрес товара: {{itemData.addressExtra.country}}, {{itemData.addressExtra.city}}, {{itemData.addressExtra.street}},
                  {{itemData.addressExtra.house}}</p>
                </v-container>
              </template>
            </v-container>
          </v-container>
        </v-container>

      </v-col>
      <div id="yandexMap" style="width: 100%; height: 50%"></div>
    </v-row>
  </v-container>
  <v-btn></v-btn>
  <AutoComplete v-model="userInput" :suggestions="suggestions" @complete="search" />
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



</template>

<script>
import axios from "axios";
import DadataView from "@/components/AddressSuggestions/DadataView.vue";
import AutocompleteComponent from "@/components/Autocomplete/AutocompleteComponent.vue";

export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  components:{
    DadataView,
    AutocompleteComponent
  },
  data() {
    return {
      bookCost:'',
      timeBeg:'',
      timeEnd: '',
      dialog: false,
      alert:false,
      overlay: false,
      itemData: null,
      itemId: null,
      carouselImages: [],
      switchValue: false,
      menu: false,
      switchValueDelivery: false,
      userInput: '',
      inputTimeout: null,
      date: new Date('2018-03-02'),
      parentData: '',
      dadataKey: 0,
      reRenderTrigger: 0,
      chosen: '',
      suggestions: [],
      dBeg: new Date(),
      dEnd: new Date(),
      value: ''
    };
  },
  watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
  created() {
    this.itemId = this.$route.params.id;
    this.fetchItemData();
  },
  watch: {
    userInput(newValue) {
      if (this.inputTimeout) clearTimeout(this.inputTimeout);

      this.inputTimeout = setTimeout(() => {
        this.sendDataToBackend(newValue);
      }, 500);
    },
    switchValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.dadataKey++;
      }
    },
  },
  methods: {
    fetchItemData() {
      const itemId = this.$route.params.id;
      console.log('??' + itemId);
      this.overlay = true
      axios.get(`http://localhost:5174/bff/ad/getById?Id=${itemId}`)
        .then(response => {
          this.itemData = response.data.data;
          this.prepareCarouselImages(this.itemData.files);
          this.parentData = response.data.data.id

          ymaps.ready(() => {
            // eslint-disable-next-line no-unused-vars
            var map = new ymaps.Map("yandexMap", {
              center: [this.itemData.addressExtra.latitude, this.itemData.addressExtra.longitude],
              zoom: 17
            });
          });
        })
        .catch(error => {
          this.alert=true;
          console.error('Ошибка при загрузке данных товара:', error);
        })
          .finally(() => {
        this.overlay = false; 
      });
    },
    askForCost(){
      axios.get('http://localhost:5174/bff/ad/getAdCost/', {
          params: {
            adId: this.itemId,
            dbeg: this.dBeg,
            dend: this.dEnd
          }
        })
        .then(response => {
          // Handle successful response
          console.log(response.data);
          if (response.data.status === 0) {
            this.bookCost = response.data.data.number;
          } else {
            console.error('Error occurred:', response.data.errors);
          }
        })
        .catch(error => {
          // Handle error
          console.error('Error occurred:', error);
        });
    },
    prepareCarouselImages(byteArray) {
      this.carouselImages = byteArray.map(byteArray => `data:image/jpeg;base64,${byteArray}`);
    },
    sendDataToBackend(query) {
      axios.post('http://localhost:5174/bff/address/suggestions', { Query: query })
        .then(response => {
          this.suggestions = response.data;
          console.log('Response from backend:', this.suggestions);
        })
        .catch(error => {
          console.error('Ошибка при отправке данных:', error);
        });
    },
    toggleSwitch() {
      this.switchValue = !this.switchValue; // или каким-то другим образом изменяете состояние свитча
      this.dadataKey++; // увеличиваем ключ для перерисовки
      this.reRenderTrigger++;
    },
    handleDateUpdate(event) {
      event.sort( function(row1, row2) {
        let k1 = row1, k2 = row2;
        return (k1 > k2) ? 1 : ( (k2 > k1) ? -1 : 0 );
      });
      this.dBeg = event[0];
      this.dEnd = event[event.length - 1];
    },


    updateTime(type, event) {
      if (type === 'begin') {
        this.timeBeg = event.target.value;
        const [hoursStr, minutesStr] = this.timeBeg.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        this.dBeg.setHours(hours);
        this.dBeg.setMinutes(minutes);
        this.dBeg.toJSON();
      } else if (type === 'end') {
        this.timeEnd = event.target.value;
        const [hoursStr, minutesStr] = this.timeEnd.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        this.dEnd.setHours(hours);
        this.dEnd.setMinutes(minutes);
        this.dEnd.toJSON();
    }
  },
   formatDate(date) {
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('ru-Ru', options);
  return formattedDate;
},
    book(){
      console.log(this.itemData)
      axios.post(`http://localhost:5174/bff/booking/create`,
        {
          adId: this.itemId,
          ownerId: this.itemData.userId,
          dBeg: this.dBeg,
          dEnd: this.dEnd
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.user.access_token}`
        }})
        .then(result => {console.log(result);
          this.dialog = true})
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
    margin: 0px;
  }
  .rentSubCon{
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 0px;
  }
  .rentDatePeriod{
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 0px;
  }
</style>
