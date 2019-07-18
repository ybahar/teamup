<template>
  <header class="app-header flex-center space-between">
    <div class="header flex flex-center space-between">
      <div class="logo-container" @click="goToHome">
        <img class="logo-icon" src="../imgs/ee-logo.svg">
      </div>
      <nav class="nav-container flex flex-center space-between" >
        <router-link class="router-categories" to="/eventera">Explore</router-link>
        <button class="link-build">Plan event</button>
        <router-link class="router-about" to="/about">Help</router-link>
        <button class="link-login">Log in</button>
        <button class="link-signup">Sign up</button>
        <img v-if="isUserLogged" src="../imgs/user.png" height="65" width="65" />
      </nav>
    </div>
  </header>
</template>


<script>
export default {
  data() {
    return {
      isUserLogged: false,
    };
  },

  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
  components: {
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraHeader.scss">
</style>

