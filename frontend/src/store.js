import Vue from 'vue'
import Vuex from 'vuex'
import eventeraStore from '@/modules/EventeraStore'
import UserStore from '@/modules/UserStore'
import SocketStore from '@/modules/SocketStore'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    eventeraStore,
    UserStore,
    SocketStore
  },
  state: {
    isLoading: false
  },
  mutations: {
    toggleLoading(state) {
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    toggleLoading(context) {
      context.commit('toggleLoading')
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    }
  }

})
