<template>
  <div class="chat-container">
    <div class="chat-list">
      <div
        v-for="chat in dataItem"
        :key="chat.id"
        class="chat-preview"
        @click="selectChat(chat)"
      >
        <div class="chat-info">
          <h3 class="chat-title">Chat with {{ getParticipantName(chat.participants) }}</h3>
          <p class="chat-snippet">{{ getLastMessageSnippet(chat.messages) }}</p>
        </div>
        <div class="chat-timestamp">
          {{ formatTimestamp(chat.createdAt) }}
        </div>
      </div>
    </div>
    <div class="chat-messages" v-if="selectedChat">
      <Chat :chatId="selectedChat.id" />
    </div>
  </div>
</template>


<script>

import axios from "axios";
import Chat from "@/pages/Chat/Chat.vue";

export default{
  components:{
    Chat
  },
  computed:{
    user() {
      return this.$store.getters.getUser;
    }
  },
  data() {
    return {
      dataItem: [],
      currentUserId: '',
      selectedChat: null,
    };
  },
  methods: {
    get() {
      axios.get(`http://localhost:5174/bff/chat/chats?Id=${this.user.profile.sub}`, {headers: {
          'Authorization': `Bearer ${this.user.access_token}`
        }})
        .then(response => {
          this.dataItem = response.data.data;
          console.log(this.dataItem);
        });

      console.log(`http://localhost:5174/bff/chat/chats?Id=${this.user.profile.sub}`)
    },
    selectChat(chat) {
      this.selectedChat = chat;
      console.log('Chat selected:', chat.id);
    },
    getParticipantName(participants) {
      const otherParticipant = participants.find(p => p !== this.currentUserId);
      return otherParticipant || 'Unknown';
    },
    getLastMessageSnippet(messages) {
      if (!messages.length) return 'No messages';
      const lastMessage = messages[messages.length - 1];
      return lastMessage.content;
    },
    formatTimestamp(timestamp) {
      // Format the timestamp as desired, e.g., 'Feb 11'
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    }
  },
  created() {
    this.currentUserId = this.user.profile.sub;
    this.get();
    console.log(this.currentUserId);
  },
  watch: {
    chatId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadChatHistory(newVal);
      }
    }
  },
}
</script>

<style scoped>
.chat-container {
  display: flex;
}
.chat-list {
  width: 30%;
  background: #2c3e50;
  overflow-y: auto;
}
.chat-preview {
  padding: 20px;
  border-bottom: 1px solid #34495e;
  cursor: pointer;
}
.chat-preview:hover {
  background: #34495e;
}
.chat-info {
  color: white;
}
.chat-timestamp {
  color: #95a5a6;
}
.chat-messages {
  width: 70%;
  padding: 20px;
  background: #ecf0f1;
}
.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
}
.sent {
  background: #3498db;
  color: white;
  align-self: flex-end;
}
.message-content {
  max-width: 70%;
}
</style>
