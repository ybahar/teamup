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
    setLoading(state , {isLoading}) {
      state.isLoading = isLoading
    }
  },
  actions: {
    setLoading(context,payload) {
      context.commit(payload)
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    }
  }

})
