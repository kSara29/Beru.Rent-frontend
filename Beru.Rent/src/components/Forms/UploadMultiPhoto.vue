<template>
  <v-file-input
    v-model="files"
    color="deep-purple-accent-4"
    counter
    label="Добавьте фото"
    multiple
    placeholder="Выбрать файлы"
    prepend-icon="mdi-image-multiple"
    variant="outlined"
    :show-size="1000"
  >
    <template v-slot:selection="{ fileNames }">
      <template v-for="(fileName, index) in fileNames" :key="fileName">
        <v-chip
          color="deep-purple-accent-4"
          label
          size="small"
          class="me-2"
        >
          {{ fileName }}
        </v-chip>

      </template>
    </template>
  </v-file-input>
</template>
<script>
  export default {
    data: () => ({
      files: [],
    }),
  }
</script>