<template>
  <header class="app-header flex-center space-between" >
    <div class="header flex flex-center space-between">
      <div class="logo-container" @click="goToHome">
        <img class="logo-icon" src="../imgs/ee-logo.svg">
      </div>
      <nav class="nav-container flex flex-center space-between" :class="mainClass" >
        <router-link class="router-categories" to="/eventera">Explore</router-link>
        <a class="link-build">Plan event</a>
        <router-link class="router-about" to="/about">Help</router-link>
        <a class="link-login">Log in</a>
        <a class="link-signup">Sign up</a>
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
  computed: {
    mainClass() {
      const isLanding = this.$route.path !== '/'
      return {'isMain': isLanding}
    }
  },
  components: {
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraHeader.scss">
</style>

