<template>
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-card class="chat-box">
            <v-card-text>
              <div v-for="(message, index) in messages" :key="index" class="message">
                <strong>{{ message.sender }}</strong> ({{ message.timestamp }}): {{ message.text }}
              </div>
            </v-card-text>
          </v-card>
          <v-text-field
            v-model="newMessage"
            label="Введите сообщение"
            @keyup.enter="sendMessage"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [],
        newMessage: '',
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() !== '') {
          const timestamp = new Date().toLocaleTimeString(); // Get the current time
          this.messages.push({
            sender: 'Вы',
            text: this.newMessage,
            timestamp: timestamp,
          });
          this.newMessage = ''; // Clear the input field after sending a message
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-box {
    height: 300px;
    overflow-y: auto;
    margin-bottom: 16px;
  }
  
  .message {
    margin-bottom: 8px;
  }
  </style>
  