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
    const response = await axios.get(`https://localhost:7296/api/booking/getAllBookingsById?Id=${props.myParam}`);
    dateRanges.value = response.data.map(d => ({
      from: new Date(d.from).setHours(0, 0, 0, 0),
      to: new Date(d.to).setHours(0, 0, 0, 0)
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
