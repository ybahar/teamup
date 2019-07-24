<template>
  <header class="app-header" :class="mainClass">
    <VueResize :ranges="rangesForHamburger" @resize="handleResizeEvent"></VueResize>
    <div class="header flex flex-center space-between">
      <div class="logo-container" @click="goToHome">
        <img class="logo-icon" src="../imgs/logo-trans.png" />
      </div>
      <div class="mobile-container" :class="{open : isOpen}">
        <nav class="nav-container flex flex-center space-between" :class="mainClass">
          <router-link @click.native="routeChange" class="router-categories" to="/eventera">Explore</router-link>
          <router-link
            @click.native="routeChange"
            class="router-categories"
            to="/eventera/edit"
          >Plan event</router-link>
          <router-link @click.native="routeChange" class="router-about" to="/about">Help</router-link>
          <div class="user-greeting" v-if="loggedUser && loggedUser._id">
            <loggedUser @logout="logout" />
          </div>
          <div class="user-action" v-else>
            <button class="router-login" @click="showLoginForm">Login</button>
            <button class="router-signup" @click="showSignupForm">Sign up</button>
          </div>
        </nav>
      </div>
      <div class="hamb-container" @click="toggleNav()" :class="{nav : isSpanX}">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
    </div>
    <VueModal @close="hideForms" @click.native="hideForms" v-if="isLoginForm || isSignupForm">
      <h1 slot="header" v-if="isSignupForm">Signup</h1>
      <h1 slot="header" v-else>Login</h1>
      <div slot="body">
        <form @submit.prevent="signup" v-if="isSignupForm">
          <input
            type="username"
            v-model="formInput.username"
            required
            autocomplete
            placeholder="Username"
          />
          <input
            type="password"
            v-model="formInput.password"
            required
            autocomplete
            placeholder="Password"
          />
          <input type="text" v-model="formInput.name" required placeholder="Full Name" />
          <div slot="footer">
            <button class="btn-action">Sign up</button>
          </div>
        </form>
        <form @submit.prevent="login" v-else>
          <input
            type="username"
            v-model="formInput.username"
            required
            autocomplete
            placeholder="Username"
          />
          <input
            type="password"
            v-model="formInput.password"
            required
            autocomplete
            placeholder="Password"
          />
          <button class="btn-action">Login</button>
        </form>
      </div>
      <div slot="footer"></div>
    </VueModal>
  </header>
</template>

<script>
import VueModal from "@/components/general/VueModal";
import userService from "@/services/UserService";
import eventBus, {
  ALERT_SUCCESS,
  ALERT_WARN,
  ALERT_ERR,
  OPEN_LOGIN,
  OPEN_SIGNUP
} from "@/EventBus";
import VueResize from "@/components/general/VueResize";
import loggedUser from "@/components/user/LoggedUser";
export default {
  created() {
    this.$store.dispatch({ type: "loadLoggedUser" });
    eventBus.$on(OPEN_LOGIN, this.showLoginForm);
    eventBus.$on(OPEN_SIGNUP, this.showSignupForm);
    this.routeListen = this.$route.path;
  },
  destroyed() {
    eventBus.$off(OPEN_LOGIN, this.showLoginForm);
    eventBus.$off(OPEN_SIGNUP, this.showSignupForm);
  },
  data() {
    return {
      isLoginForm: false,
      isSignupForm: false,
      isSpanX: false,
      isOpen: false,
      routeListen: null,
      formInput: {
        username: "",
        password: "",
        name: ""
      },
      errMsg: "",
      rangesForHamburger: [
        { min: 0, max: 600, name: "mobile" },
        { min: 601, max: 10000, name: "regular" }
      ]
    };
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
    mainClass() {
      let isLanding = true;
      if (this.$route.path === "/" || this.$route.path === "/eventera/edit") {
        isLanding = false;
      }
      return { isMain: isLanding };
    }
  },
  methods: {
    handleResizeEvent(sizeName) {
      if (sizeName === "mobile") {
        this.closeNav();
      }
    },
    toggleNav() {
      this.isSpanX = !this.isSpanX;
      this.isOpen = !this.isOpen;
    },
    closeNav() {
      this.isSpanX = false;
      this.isOpen = false;
    },
    routeChange() {
      if (this.routerListes !== this.$route.path && this.isOpen === true)
        this.toggleNav();
    },
    clearFormInput() {
      this.formInput = {
        username: "",
        password: "",
        name: ""
      };
    },
    clearErr() {
      this.errMsg = "";
    },
    async login() {
      try {
        const credentials = {
          username: this.formInput.username,
          password: this.formInput.password
        };
        await userService.login(credentials);
        this.$store.dispatch({ type: "loadLoggedUser" });
        this.clearFormInput();
        this.hideForms();
        eventBus.$emit(ALERT_SUCCESS, "Login", "Successfuly logged in!");
      } catch (err) {
        this.errMsg = err.message;
        setTimeout(this.clearErr, 5 * 1000);
      }
    },
    async signup() {
      try {
        const credentials = {
          username: this.formInput.username,
          password: this.formInput.password,
          name: this.formInput.name
        };
        await userService.signup(credentials);
        this.$store.dispatch({ type: "loadLoggedUser" });
        this.clearFormInput();
        this.hideForms();
      } catch (err) {
        this.errMsg = err.message;
        setTimeout(this.clearErr, 6000);
      }
    },
    logout() {
      userService.logout();
      if (this.$route.path.includes("/user")) this.$router.push("/");
      this.$store.commit({ type: "setLoggedUser", user: { _id: "" } });
    },
    goToHome() {
      this.$router.push("/");
    },
    showLoginForm() {
      console.log("in show");
      this.isSignupForm = false;
      this.isLoginForm = true;
    },
    showSignupForm() {
      console.log("in show");
      this.isLoginForm = false;
      this.isSignupForm = true;
    },
    hideForms() {
      this.isLoginForm = false;
      this.isSignupForm = false;
      this.clearFormInput();
    }
  },
  components: {
    VueModal,
    VueResize,
    loggedUser
  }
};
</script>

<style lang="scss" scoped src="../styles/components/_EventeraHeader.scss">
</style>

