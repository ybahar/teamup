<template>
  <section>
    <span class="chat-icon" @click.stop="openChat"></span>
    <div class="chat-container" @click.stop :class="{chat: isChat}">
      <button class="chat-close-btn btn" @click.stop="closeChat">X</button>
      <h1 class="chat-title">Members chat</h1>
      <section class="chat-msgs" ref="myref">
        <section
          class="chat-msg"
          :class="{'user-msg' : msg.sender === username}"
          v-for="msg in msgs"
          :key="msg.sentAt"
        >
          <span class="sender">{{msg.sender}}</span>
          <p class="msg-body">{{msg.txt}}</p>
          <span class="sent-at">{{msg.sentAt | timeAgo}}</span>
        </section>
      </section>
      <form @submit.prevent="sendMsg">
        <input
          type="text"
          class="chat-input"
          v-model="txt"
          :disabled="!isLoggedIn"
          :placeholder="placeholder"
        />
        <button :disabled="!isLoggedIn" class="send-btn">></button>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      txt: "",
      isChat: false
    };
  },
  computed: {
    msgs() {
      return this.$store.getters.chatMsgs;
    },
    isLoggedIn() {
      let user = this.$store.getters.loggedUser;
      return user;
    },
    placeholder() {
      return this.isLoggedIn ? "Your message" : "Must be logged in";
    },
    username() {
      if (this.isLoggedIn) {
        return this.$store.getters.loggedUser.username;
      }
      return null;
    }
  },
  methods: {
    sendMsg() {
      let msg = { txt: this.txt };
      this.$store.dispatch("sendMsg", msg);
      this.txt = "";
      this.$refs.myref.scrollTop = this.$refs.myref.scrollHeight;
    },
    closeChat() {
      this.isChat = false;
    },
    openChat() {
      this.isChat = !this.isChat;
      this.$refs.myref.scrollTop = this.$refs.myref.scrollHeight;
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraChat.scss"></style>

