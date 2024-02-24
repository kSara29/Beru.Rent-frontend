<template>
  <v-container>
    <v-card>
      <v-card-title>Чат</v-card-title>
      <v-card-text style="height: 656px; overflow-y: auto; display: flex; flex-direction: column;">
        <div v-for="message in messages" :key="message.messageId"
             class="message-bubble"
             :class="{'message-right': message.senderId === currentUserId, 
             'message-left': message.senderId !== currentUserId}">
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
  props: {
    chatId: String
  },
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
      currentUserId: ''
    };
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() === '') {
        return;
      }

      const messageToSend = {
        text: this.newMessage,
        senderId: this.currentUserId,
      };

      await axios.post('http://localhost:5174/bff/chat/sendMessageByChatId', {
        message: this.newMessage,
        chatId: this.chatId
      }, {
        headers: {
          'accept': 'text/plain',
          'Authorization': `Bearer ${this.user.access_token}`
        }
      })
        .then(response => {
          //this.messages.push(messageToSend);
          console.log(response);
        })
        .catch(error => {
          console.error("Произошла ошибка при выполнении запроса:", error);
        });

      this.newMessage = '';
    },
    receiveMessage(senderId, message) {
      this.messages.push({
        senderId: senderId,
        text: message,
      });
    },
    setupSignalR(chatId) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5027/chatHub?chatId=${chatId}`)
        .build();

        this.hubConnection.on('ReceiveMessage', (senderId, message) => this.receiveMessage(senderId, message));

      this.hubConnection.start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.error('SignalR Connection Error: ', err));
    },
    async loadChatHistory(chatId) {
      try {
        const response = await axios.get(`http://localhost:5174/bff/chat/loadChatHistoryById?Id=${chatId}`,{
          headers: {
            'Authorization': `Bearer ${this.user.access_token}`
          }
        });
        this.messages = response.data.data;
        console.log(this.messages.senderId);
      } catch (error) {
        console.error('Ошибка при загрузке истории чата:', error);
      }
    },
  },
  mounted() {
    this.setupSignalR(this.chatId);
    this.loadChatHistory(this.chatId);
    this.currentUserId = this.user.profile.sub;
    console.log("ID текущего пользователя: "+this.currentUserId);
  },
  watch: {
    chatId(newVal) {
      if (newVal) {
        this.loadChatHistory(newVal);
      }
    }
  },
};
</script>

<style>
  .message-bubble {
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 5px;
    display: block;
    max-width: 80%;
    word-wrap: break-word;
    height: max-content;

  }

  .message-left {
    background-color: #CAF0F8;
    text-align: left;
    margin-left: 0;
    margin-right: auto;
  }

  .message-right {
    background-color: #D1FAE5;
    text-align: right;
    margin-right: 0;
    margin-left: auto;
  }
</style>
