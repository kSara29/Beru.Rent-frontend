<script setup>

</script>

<template>
  <v-form @submit.prevent>
    <div>
      <v-select
        label="Выберите категорию"
        v-model="categoryId"
        :items="categories"
      ></v-select>
    </div>
    <div class="form-group">
      <v-text-field
        v-model="title"
        name="Укажите название"
        label="Укажите название"
        :rules="titleRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field
        v-model="description"
        name="Опишите товар"
        label="Опишите товар"
        :rules="descriptionRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field
        v-model="extraConditions"
        name="Дополнительные условия"
        label="допольнительные условия"
        :rules="conditionRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-checkbox
        v-model="deposit"
        label="Требуется ли залог?"
        hide-details="auto"
      ></v-checkbox>
    </div>
    <div class="form-group" v-if="deposit">
      <v-text-field
        v-model="minDeposit"
        name="Минимальный залог"
        label="Минимальный залог"
        :rules="minimumDepositRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div>
      <v-select
        label="Минимальный промежуток времени для аренды"
        v-model="timeunitId"
        :items="timeunit"
      ></v-select>
    </div>
    <div>
      <v-text-field
        v-model="price"
        label="Цена за единицу времени аренды (например за месяц)"
        :rules="priceRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div>
      <v-select
        label="Выберите категорию"
        v-model="categoryId"
        :items="categories"
      ></v-select>
    </div>
    <div>
      <v-select
        label="Тип контракта"
        v-model="contractTypeId"
        :items="contracts"
      ></v-select>
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
