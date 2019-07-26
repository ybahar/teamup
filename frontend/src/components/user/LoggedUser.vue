<template>
  <section
    :class="isLandingClass"
    @mouseleave="isMenuDisplayed = false"
    @click="isMenuDisplayed = false"
  >
    <div class="logged-user">
      <img
        @mouseover="isMenuDisplayed = true"
        @click="toggleMenu"
        :src="user.profileImgUrl"
        height="65"
        width="65"
      />
      <div v-if="isMenuEnabled && isMenuDisplayed" @mouseover="isMenuDisplayed = true" class="menu">
        <router-link class="menu-item" to="/user">Profile page</router-link>
        <div class="menu-item" @click="$emit('logout')">Logout</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isMenuEnabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMenuDisplayed: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedUser;
    },
    isLandingClass() {
      return {
        isLanding:
          this.$route.path === "/" || this.$route.path === "/eventera/edit"
      };
    }
  },
  async created() {
    await this.$store.dispatch({ type: "loadLoggedUser" });
  },
  methods: {
    toggleMenu() {
      this.isMenuDisplayed = !this.isMenuDisplayed;
    }
  }
};
</script>
<style lang="scss" scoped>
.logged-user {
  position: relative;
}
.menu {
  padding: 5px;
  position: absolute;
  background: black;
  color: $clr1;
}
.menu > * {
  padding: 5px;
  display: block;
  border-bottom: 1px solid white;
}
.menu-item {
  cursor: pointer;
  position: relative;
    transition: left 0.2s;
  &:hover {
    transition: transform 0.2s;
    transform: translateX(2px);
  }
}

.isLanding {
  color: black;
  .menu {
    padding: 5px;
    position: absolute;
    background: $clr1;
    color: black;
  }
  .menu > * {
    padding: 5px;
    display: block;
    border-bottom: 1px solid black;
  }
}
</style>
