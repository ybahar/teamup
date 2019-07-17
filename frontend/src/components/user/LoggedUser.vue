<template>
  <section>
    <div class="login-box">
      <div v-if="user._id">
        Welcome,
        <router-link to="/user/">{{ user.username }}</router-link>
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <div v-if="status">
          <div class="quit" @click="clear">X</div>
          <h3>{{ status }}</h3>
          <form @submit.prevent="execSubmit">
            <span v-if="err" class="danger">{{err}}</span>
            <input v-model="credentials.username" type="text" placeholder="Username" required />
            <input v-model="credentials.password" type="password" placeholder="Password" required />
            <hr />
            <button>{{status | capitalize}}</button>
          </form>
        </div>
        <div v-else>
          Welcome guest,
          <div class="bottom">
            <button @click="status='signup'">Sign Up</button>
            <button @click="status='login'">Login</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import userService from "@/services/UserService";
import { setTimeout } from "timers";

export default {
  computed: {
    user() {
      return this.$store.getters.loggedUser
    }
  },
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      err: "",
      // status
      //  '' - for no status
      //  'login' - after pressing login
      //  'signup' - after pressing signup
      status: ""
    };
  },
  created() {
    this.$store.dispatch({ type: "loadLoggedUser" });
    if (this.user) {
    } else {
      console.log("no user found :(");
    }
  },
  methods: {
    clear() {
      this.clearErr();
      this.clearCredentials();
      this.status = "";
    },
    async login() {
      try {
        await userService.login(this.credentials);
        this.$store.dispatch({ type: "loadLoggedUser" });
        this.clearCredentials();
      } catch (err) {
        this.err = err.message;
        setTimeout(this.clearErr, 5 * 1000);
      }
    },
    async signup() {
      try {
        await userService.signup(this.credentials);
        this.$store.dispatch({ type: "loadLoggedUser" });
        this.clearCredentials();
      } catch (err) {
        this.err = err.message;
        setTimeout(this.clearErr, 6000);
      }
    },
    logout() {
      userService.logout();
      this.$store.commit({ type: "setLoggedUser", user: { _id: "" } });
      this.clear();
    },
    storeUser() {
      // TODO: continue
      // this.$store.commit({ type: "setLoggedUser", user: this.user });
    },
    clearCredentials() {
      this.credentials.username = "";
      this.credentials.password = "";
    },
    clearErr() {
      this.err = "";
    },
    execSubmit(status) {
      // executes login / status methods
      this[this.status]();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  position: relative;
  background-color: $clr1;
  // top: 10px;
  // right: 10px;
  padding: 20px;
  width: 400px;
  height: 215px;
  // border: 1px solid rgba(0.5, 0.5, 0.5, 0.3);
}
.login-box * {
  margin: 5px;
}
a {
  color: inherit;
  text-decoration: inherit;
}
.bottom {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
}
.quit {
  position: absolute;
  padding: 3px;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>
