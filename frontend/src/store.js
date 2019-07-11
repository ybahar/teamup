import Vue from 'vue'
import Vuex from 'vuex'
import eventeraService from '@/services/EventeraService'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventeras : [],
  },
  mutations: {
    saveEventera(state, { eventera, _id }) {
      let idx = state.eventeras.findIndex((currEventera) => currEventera._id === _id)
      state.eventeras.splice(idx, 1, eventera)

    },
    setEventeras(state,eventeras){
      state.eventeras = eventeras;
    }
  },
  actions: {
    async saveEventera(context, eventera) {
      let updatedEventera;
      if (eventera._id) {
        updatedEventera = await eventeraService.update(eventera)
      } else updatedEventera = await eventeraService.add(eventera)
      context.commit({ type: 'saveEventera', Updatedeventera: updatedEventera, _id: eventera._id })
      return updatedEventera
    },
    async loadEventeras(context,filterBy = null){
     eventeras = await eventeraService.query(filterBy)
     context.commit({type:'setEventeras',eventeras})
    }
  },
  async getEventeraById(context,{_id}){
      let eventera = await eventeraService.getById(_id);
      return eventera;
  }
})
