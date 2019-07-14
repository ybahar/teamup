import Vue from 'vue'
import Vuex from 'vuex'
import eventeraStore from '@/modules/EventeraStore'
import UserStore from '@/modules/UserStore'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    eventeraStore,
    UserStore
  },
  state: {
  },
  mutations: {
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
    }
  },
  actions: {

  },

})
