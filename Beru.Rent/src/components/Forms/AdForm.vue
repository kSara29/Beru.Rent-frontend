<script setup>

</script>

<template>
  <v-form @submit.prevent>
    <div>
      <v-select
        prepend-icon="mdi-go-kart"
        label="Выберите категорию"
        v-model="categoryId"
        :items="categories"
      ></v-select>
    </div>
    <div class="form-group">
      <v-text-field
        prepend-icon="mdi-text"
        v-model="title"
        name="Укажите название"
        label="Укажите название"
        :rules="titleRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field
        prepend-icon="mdi-text-long"
        v-model="description"
        name="Опишите товар"
        label="Опишите товар"
        :rules="descriptionRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field
        prepend-icon="mdi-exclamation"
        v-model="extraConditions"
        name="Дополнительные условия"
        label="Дополнительные условия"
        :rules="conditionRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-checkbox
        prepend-icon="mdi-credit-card-outline"
        v-model="deposit"
        label="Требуется ли залог?"
        hide-details="auto"
      ></v-checkbox>
    </div>
    <div class="form-group" v-if="deposit">
      <v-text-field
        prepend-icon="mdi-cash-multiple"
        v-model="minDeposit"
        name="Минимальный залог"
        label="Минимальный залог"
        :rules="minimumDepositRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div>
      <v-select
        prepend-icon="mdi-timer-sand"
        label="Минимальный промежуток времени для аренды"
        v-model="timeunitId"
        :items="timeunit"
      ></v-select>
    </div>
    <div>
      <v-text-field
        prepend-icon="mdi-cash-multiple"
        v-model="price"
        label="Цена за единицу времени аренды (например за месяц)"
        :rules="priceRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div>
      <v-select        
        prepend-icon="mdi-file-sign"
        label="Тип контракта"
        v-model="contractTypeId"
        :items="contracts"
      ></v-select>
    </div>
    <div class="form-group">
      <v-text-field
        prepend-icon="mdi-map-marker"
        v-model="addressString"
        name="Введите адрес одной строкой"
        label="Введите адрес одной строкой"
        :rules="address"
        hide-details="auto"
      ></v-text-field>
    </div>
    
    <br />
  </v-form>
</template>

<script>
  export default {
    data: () => ({
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
    })
  }
</script>

<style scoped>

</style>
