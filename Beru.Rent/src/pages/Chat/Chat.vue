<template>
  <v-container>
    <v-card>
      <v-card-title>Чат</v-card-title>
      <v-card-text style="height: 300px; overflow-y: auto;">
        <div v-for="message in messages" :key="message.id">
          <v-chip :color="getColor(message.sender)" label>{{ message.sender }}</v-chip>
          {{ message.text }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          label="Сообщение"
          v-model="newMessage"
          @keyup.enter="sendMessage"
        ></v-text-field>
        <v-btn color="primary" @click="sendMessage">Отправить</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import * as signalR from '@microsoft/signalr';
import axios from "axios";

export default {
  computed:{
    user() {
      return this.$store.getters.getUser;
    }
  },
  data() {
    return {
      hubConnection: null,
      messages: [],
      newMessage: '',
    };
  },
  methods: {
    getColor(senderId) {
      const currentUserId = 'dd0c7db7-5a96-4be8-b33f-46f1d3e0e94b';
      //console.log(senderId + ' != ' + currentUserId);
      senderId = 'dd0c7db7-5a96-4be8-b33f-46f1d3e0e90b';
      return senderId === currentUserId ? 'blue' : 'green';
    },
    async sendMessage() {
      console.log(this.newMessage);
      if (this.newMessage.trim() === '') {
        return;
      }

      await axios.post('https://localhost:7105//bff/chat/sendMessageByChatId', {
        Message: this.newMessage,
        ChatId: '1bdc988b-6310-46db-ad86-097fa7430c6e'},
        {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.user.access_token}`
          }
        }
      ).then(console.log(this.user.access_token));


      this.newMessage = '';
    },
    receiveMessage(user, message) {
      this.messages.push({
        sender: user,
        text: message,
      });
    },
    setupSignalR() {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5027/chatHub')
        .build();

      this.hubConnection.on('ReceiveMessage', this.receiveMessage);

      this.hubConnection.start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.error('SignalR Connection Error: ', err));
    },
    async loadChatHistory(chatId) {
      try {
        const response = await axios.get(`https://localhost:7105/bff/chat/loahChatHistoryById?Id=${chatId}`);
        this.messages = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке истории чата:', error);
      }
    },
  },
  mounted() {
    this.setupSignalR();
    const chatId = '1bdc988b-6310-46db-ad86-097fa7430c6e';
    this.loadChatHistory(chatId);
  },
};
</script>


?
