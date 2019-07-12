import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: {
      _id: 'u101',
      name: 'Salom Anderson'
    }
  },
  mutations: {
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
    }
  },
  actions: {

  }
})
