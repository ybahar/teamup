import eventeraService from '@/services/EventeraService'


export default {
    
    state: {
        eventeras : [],
        filterBy: {
            txt:''
        }
    },
    mutations: {
        saveEventera(state, { eventera, _id }) {
            if(_id){
                let idx = state.eventeras.findIndex((currEventera) => currEventera._id === _id)
                state.eventeras.splice(idx, 1, eventera)
            } else state.eventeras.push(eventera)
          
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
            console.log(eventera)
            context.commit({ type: 'saveEventera', eventera:updatedEventera, _id: eventera._id })
            return updatedEventera
        },
        async loadEventeras(context,filterBy = null){
            eventeras = await eventeraService.query(filterBy)
            context.commit({type:'setEventeras',eventeras})
        },
        async getEventeraById(context,{_id}){
            console.log('in store getbyid')
            let eventera = await eventeraService.getById(_id);
            return eventera;
        }
    },
}