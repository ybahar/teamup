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
      <input type="text" class="chat-input" />
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      isChat: false
    };
  },
  computed: {
    msgs() {
      let msgs = [
        { senderName: "koko", txt: "kokos msg" , sentAt:6844684684864},
        { senderName: "momo", txt: "momos msg" , sentAt:5466468465846}
      ];
      return msgs;
    }
  },
  methods: {
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

