<template>
  <section>
    <span class="chat-icon" @click.stop="openChat"></span>
    <div class="chat-container" @click.stop :class="{chat: isChat}">
      <button class="chat-close-btn btn" @click.stop="closeChat">X</button>
      <h1>Members chat</h1>
      <section class="chat-msgs" ref="myref">
        <section class="chat-msg" :class="{'user-msg' : msg.sender === username}" 
        v-for="msg in msgs" :key="msg.sentAt">
          <p>
            <span>{{msg.sender}}</span> :
            <span>{{msg.txt}}</span>
          </p>
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
        <button>send</button>
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
      return user && user._id;
    },
    placeholder() {
        return this.isLoggedIn ? "Your message" : "Must be logged in";
    },
    username() {
        return this.$store.getters.loggedUser.username;
    }
  },
  methods: {
      sendMsg() {
          let msg = { sender: this.username, txt: this.txt, sentAt: Date.now() };
      this.$store.dispatch("sendMsg", msg);
      this.txt = '';
        this.$refs.myref.scrollTop = this.$refs.myref.scrollHeight +60
    },
    closeChat() {
      this.isChat = false;
    },
    openChat() {
      this.isChat = !this.isChat;
      this.$refs.myref.scrollTop = this.$refs.myref.scrollHeight
    } 
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraChat.scss"></style>

