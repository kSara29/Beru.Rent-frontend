<template>
    <div class="text-center">
      <v-btn
        :disabled="dialog"
        :loading="dialog"
        prepend-icon="mdi-check-bold"
        color="purple-darken-2"
        @click="dialog = true"
      >
        Разместить объявление
      </v-btn>
      <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
        <v-card color="primary">
          <v-card-text>
           Сохраняем...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          dialog: false,
        }
      },
  
      watch: {
        dialog(val) {
          if (!val) return
  
          setTimeout(() => (this.dialog = false), 4000)
        },
      },
    }
  </script>
  