<script setup>

</script>

<template>

  <v-form @submit.prevent>
    <div class="form-group">
      <v-select
      variant="outlined"
        prepend-icon="mdi-go-kart"
        label="Выберите категорию"
        name="categoryId"
        v-model="categoryId"
        :items="categories"
      ></v-select>
    </div>
    <div class="form-group">
      <v-text-field clearable
        variant="outlined"
        prepend-icon="mdi-text"
        v-model="title"
        name="title"
        label="Укажите название"
        :rules="titleRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-textarea
      clearable
      variant="outlined"
        prepend-icon="mdi-text-long"
        v-model="description"
        name="description"
        label="Опишите товар"
        :rules="descriptionRules"
        hide-details="auto"
      ></v-textarea>
    </div>
    <div class="form-group">
      <v-text-field
      clearable
      variant="outlined"
        prepend-icon="mdi-exclamation"
        v-model="extraConditions"
        name="extraConditions"
        label="Дополнительные условия"
        :rules="conditionRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-checkbox
        prepend-icon="mdi-credit-card-outline"
        v-model="deposit"
        name="deposit"
        label="Требуется ли залог?"
        hide-details="auto"
      ></v-checkbox>
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
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-select
      variant="outlined"
        prepend-icon="mdi-timer-sand"
        label="Минимальный промежуток времени для аренды"
        v-model="timeunitId"
        name="timeunitId"
        :items="timeunit"
      ></v-select>
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
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-select
      variant="outlined"
        prepend-icon="mdi-file-sign"
        label="Тип контракта"
        v-model="contractTypeId"
        name="contractTypeId"
        :items="contracts"
      ></v-select>
    </div>
    <div class="form-group">
      <v-text-field
      clearable
      variant="outlined"
        prepend-icon="mdi-map-marker"
        v-model="addressString"
        name="addressString"
        label="Введите адрес одной строкой"
        :rules="address"
        hide-details="auto"
      ></v-text-field>
    </div>
    <br />
    <v-btn @click="getData()" type="submit">Создать объявление</v-btn>
  </v-form>
</template>


<script>
  export default {
    data() {
      return {
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
        conditionRules: [
         // value => !!value || 'а что он должен сюда вводит?'
        ],
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
        categories: ['Автомобиль','Частный дом','Квартира','Техника','Оборудование','Кухня','Одежда','Игрушки'],
        contractTypeId: '',
        contracts: ['Недвижимость', 'Движимое имущество'],
        timeunitId: '',
        timeunit: ['Час','Сутки','Неделя','Месяц']
      }
    },
    methods: {
      fakeData() {
        let data = ''
        console.log(data)
        return data
      },
      getData() {
        let user = {
          Title: this.title,
          Description: this.description,
          ExtraConditions: this.extraConditions,
          Deposit: this.deposit,
          MinDeposit: this.minDeposit,
          Price: this.price,
          CategoryId: this.categoryId,
          ContractTypeId: this.contractTypeId,
          TimeUnitId: this.timeunitId,
          Form: new FormData()
        }
        return user
      }
    }
  }
</script>

<style scoped>
.form-group{
  margin-top: 10px;
}
</style>
