<script setup>

</script>

<template>
  <v-form @submit.prevent>
    <div class="form-group">
      <v-text-field
        v-model="title"
        name="название объявлении"
        label="Название"
        :rules="titleRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field
        v-model="description"
        name="описание"
        label="описание"
        :rules="descriptionRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field
        v-model="extraConditions"
        name="доп условия"
        label="допольнительные условия"
        :rules="conditionRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div class="form-group">
      <v-checkbox
        v-model="deposit"
        label="требуется ли залог?"
        hide-details="auto"
      ></v-checkbox>
    </div>
    <div class="form-group" v-if="deposit">
      <v-text-field
        v-model="minDeposit"
        name="минимальный залог"
        label="минимальный залог"
        :rules="minimumDepositRules"
        hide-details="auto"
      ></v-text-field>
    </div>
    <div>
      <v-text-field
        v-model="price"
        label="цена"
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
    <div>
      <v-select
        label="Адрес эктра айди? (замените название в Adform.vue)"
        v-model="addressExtraId"
        :items="addresses"
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
        value => !!value || 'Укажите название вещи!',
        value => value.length < 30 || 'название не должна быть больше 30 символов',
        value => value.length > 3 || 'название должна содержать хотябы 3 букв'
      ],
      description: '',
      descriptionRules: [
        value => !!value || 'опишите данную вещь',
        value => value.length > 50 || 'описнаие должна содержать более 50 символов!'
      ],
      extraConditions: '',
      conditionRules: [
        value => !!value || 'а что он должен сюда вводит?'
      ],
      deposit: false,
      minDeposit: '',
      minimumDepositRules: [
        value => !!value || 'введите сумму минимального залога'
      ],
      price: '',
      priceRules: [
        value => {
          const pattern = /^[0-9]{0,100}$/
          return pattern.test(value) || "цена может содержать только цифры!"
        }
      ],
      categoryId: '',
      categories: ['Техника','Оборудование','Кухня','Одежда','Игрушки'],
      contractTypeId: '',
      contracts: ['Помещение', 'Вещь'],
      addressExtraId: '',
      addresses: ['это из сервера получаем?']
    })
  }
</script>

<style scoped>

</style>
