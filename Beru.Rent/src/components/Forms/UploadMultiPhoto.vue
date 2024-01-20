<template>
  <v-file-input
    v-model="files"
    color="deep-purple-accent-4"
    counter
    label="Добавьте фото"
    placeholder="Выбрать файлы"
    prepend-icon="mdi-image-multiple"
    variant="outlined"
    :show-size="1000"
    @change="onAdd()"
  >
    <template v-slot:selection="{ fileNames }">
      <template v-for="(fileName) in fileNames" :key="fileName">
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
  <v-carousel hide-delimiters="">
    <v-carousel-item
      v-for="(item) in displayFiles"
      :key="item.name"
      :src="item"
      cover=""
    ></v-carousel-item>
  </v-carousel>
  <v-btn @click="onRemove()">Удалить последнее</v-btn>
</template>
<script>
  export default {
    data:() => ({
      files: [],
      displayFiles: [],
      sendingFiles: []
    }),
    methods: {
      onAdd() {
        const length = this.files.length;
        for(let i = 0; i < length; i++) {
          this.displayFiles.push(URL.createObjectURL(this.files[i]))
          this.sendingFiles.push(this.files[i])
        }
      },
      onRemove() {
        this.displayFiles.splice(-1);
        this.files.splice(-1);
        this.sendingFiles.splice(-1)
      },
      getFiles() {
        return this.sendingFiles
      }
    }
  }
</script>
