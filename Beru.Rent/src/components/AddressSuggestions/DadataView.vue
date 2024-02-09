<template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        min="2016-06-15"
        max="2025-03-20"
        width="100%"
        color="green lighten-1"
      ></v-date-picker>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from 'vue'
import axios from 'axios'

const date = ref(new Date())
const dateRanges = ref([])

const props = defineProps({
  myParam: {
    type: String,
    required: true
  }
});

watch(() => props.myParam, (newValue) => {
  if (newValue) {
    fetchData();
  }
});

onMounted(fetchData);


async function fetchData() {
  try {
    /*console.log('!!' + props.myParam);*/
    const response = await axios.get(`http://localhost:5174/bff/booking/getbookingdates/${props.myParam}`);
    console.log('!!!  ' + `http://localhost:5174/bff/booking/getbookingdates/${props.myParam}`);
    dateRanges.value = response.data.data.map(d => ({
      from: new Date(d.Dbeg).setHours(0, 0, 0, 0),
      to: new Date(d.Dend).setHours(0, 0, 0, 0)
    }));
  } catch (error) {
    console.log('Ошибка при получении данных с сервера');
  }
}

function allowedDates(date) {
  const checkDate = new Date(date).setHours(0, 0, 0, 0);
  return !dateRanges.value.some(range =>
    checkDate >= range.from && checkDate <= range.to
  )
}

</script>
