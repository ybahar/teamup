<template>
  <section class="app-header" @click="closeLogin">
    <div class="collapsible flex flex-center space-between">
      <div class="logo-container" @click="goToHome">
        <span class="logo-icon">🅴🆅🅴🅽🆃🅴🆁🅰</span>
        <span class="logo-text">Constructing events 🛠️</span>
      </div>
      <nav class="nav-container flex flex-center space-between" >
        <router-link class="router-categories" to="/eventera">Explore</router-link>
        <router-link class="router-about" to="/about">Help</router-link>
        <img @click.stop="openHeader" src="../imgs/user.png" height="65" width="65" />
      </nav>
    </div>
    <div class="content" :class="{open: isOpen}" v-if="isOpen">
          <LoggedUser />
    </div>
  </section>
</template>


<script>
import LoggedUser from "@/components/user/LoggedUser.vue";
export default {
  data() {
    return {
      isOpen: false,
      filterBy: { txt: "" }
    };
  },

  methods: {
    openHeader() {
      this.isOpen = !this.isOpen;
    },
    setInput() {
      this.$emit("searchEvent", this.filterBy);
    },
    goToHome() {
      this.$router.push("/");
    },
    closeLogin() {
      this.isOpen = false;
    }
  },
  components: {
    LoggedUser
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraHeader.scss">
</style>

