<template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        min="2016-06-15"
        max="2025-03-20"
        width="300px"
        color="green lighten-1"
      ></v-date-picker>
    </v-row>

    <v-row justify="space-around">
      <v-time-picker
        v-model="time"
        :allowed-hours="allowedHours"
        :allowed-minutes="allowedMinutes"
        class="mt-4"
        format="24hr"
        scrollable
        min="9:30"
        max="22:15"
      ></v-time-picker>

      <v-time-picker
        v-model="timeStep"
        :allowed-minutes="allowedStep"
        class="mt-4"
        format="24hr"
      ></v-time-picker>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDate } from 'vuetify'
import { ref } from 'vue'

const date = ref(new Date('2018-03-02'))
const adapter = useDate()

const time = ref('11:15')
const timeStep = ref('10:10')

function allowedDates (val) {
  return parseInt(adapter.toISO(val).split('-')[2], 10) % 2 === 0
}
</script>

<script>
export default {
  data: () => ({
    date: new Date('2018-03-02'),
    time: '11:15',
    timeStep: '10:10',
  }),

  methods: {
    allowedDates: val => {
      return parseInt(this.$vuetify.date.toISO(val).split('-')[2], 10) % 2 === 0
    },
    allowedHours: v => v % 2,
    allowedMinutes: v => v >= 10 && v <= 50,
    allowedStep: m => m % 10 === 0,
  },
}
</script>
