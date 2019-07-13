import Vue from 'vue'
import Vuex from 'vuex'
import eventeraStore from '@/modules/EventeraStore'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    eventeraStore
  },
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

  },

})
