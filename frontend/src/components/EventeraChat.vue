<template>
  <section>
    <span class="chat-icon" @click.stop="openChat"></span>
    <div class="chat-container" @click.stop :class="{chat: isChat}">
      <button class="chat-close-btn btn" @click.stop="closeChat">X</button>
      <h1>Members chat</h1>
      <section class="chat-msgs">
        <section class="chat-msg" v-for="msg in msgs" :key="msg.sentAt">
          <p>
            <span>{{msg.senderName}}</span> :
            <span>{{msg.txt}}</span>
          </p>
        </section>
      </section>
      <form @submit.prevent="sendMsg">
        <input type="text" class="chat-input" v-model="msg.txt" />
        <button>send</button>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
        msg : {
         senderName : '',
         txt : '',
        },
      isChat: false
    };
  },
  computed: {
    msgs() {
      return this.$store.getters.chatMsgs
    }
  },
  methods: {
    sendMsg() {
        this.$store.dispatch('sendMsg',this.msg)
    },
    closeChat() {
      this.isChat = false;
    },
    openChat() {
      this.isChat = !this.isChat;
    }
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/_EventeraChat.scss"></style>

