<template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        min="2016-06-15"
        max="2025-03-20"
        width="100%"
        color="#FFCA28"
        multiple
      ></v-date-picker>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineProps, watch, onMounted, defineEmits } from 'vue'
import axios from 'axios'

const date = ref([new Date()])
const emits = defineEmits(['update:date']);
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

watch(date, (newDate) => {
  emits('update:date', newDate); // Эмитируем событие с новой датой
  date._value.sort( function(row1, row2) {
    let k1 = row1, k2 = row2;
    return (k1 > k2) ? 1 : ( (k2 > k1) ? -1 : 0 );
  });
  getDates(date._value[0], date._value[date._value.length - 1]);
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

function getDates(startDate, stopDate) {
  let currentDate = new Date(startDate);

  while (currentDate <= stopDate) {
    date._value.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  date._value = cleanIt(date._value);
}

function cleanIt(arr) {
  let shorterArray = []
  arr.forEach(element => {
    if (!shorterArray.includes(element.toISOString().split('T')[0])){
      shorterArray.push(element.toISOString().split('T')[0])
    }
  });
  shorterArray.forEach((element, index) => {
    shorterArray[index] = new Date(element);
  });
  return shorterArray;
}

</script>
