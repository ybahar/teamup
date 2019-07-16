import eventeraService from '@/services/EventeraService'


export default {
    state: {
        eventeras: [],

        filterBy: {
            txt: ''
        },
        categories: ["sport", "soccer", "pop"]
    },
    mutations: {
        saveEventera(state, { eventera, _id }) {
            if (_id) {
                let idx = state.eventeras.findIndex((currEventera) => currEventera._id === _id)
                state.eventeras.splice(idx, 1, eventera)
            } else state.eventeras.push(eventera)

        },
        setEventeras(state, { eventeras }) {
            state.eventeras = eventeras;
        },
        setFilter(state, filterBy) {
            state.filterBy = filterBy
        },
    },
    getters: {
        eventerasForDisplay(state) {
            return state.eventeras
        },
        eventerasByCategories(state) {
            // each object in the array holds {category: 'cat', eventeras: [...]}
            // this is pre - mongo. post-mongo should just make 3 finds with all filters
            if (state.eventeras) {
                return state.categories.map(category => {
                    let eventerasByCategory = {};
                    eventerasByCategory.category = category;
                    let filteredEventeras =
                        [...state.eventeras.filter(e =>
                            e.categories.filter(c => c === category).length !== 0)];
                    eventerasByCategory.eventeras = filteredEventeras;
                    return eventerasByCategory
                });
            } else return [];
        },
        categories(state) {
            return state.categories
        },
        // getAlmostExpired(state) {
        //     console.log('inside the filter:', state.eventeras)
        //     let almostExpired = state.eventeras.filter(eventera => {
        //         (eventera.expireAt - eventera.createdAt) < 172800000
        //     })
        //     return almostExpired

        // }
    },
    actions: {
        async saveEventera(context, eventera) {
            let updatedEventera;
            eventera // j: I keep wondering why do you just type them
            if (eventera._id) {
                updatedEventera = await eventeraService.update(eventera)
            } else {
                eventera.createdAt = Date.now();
                updatedEventera = await eventeraService.add(eventera)
            }
            console.log(eventera)
            context.commit({ type: 'saveEventera', eventera: updatedEventera, _id: eventera._id })
            return updatedEventera
        },
        async loadEventeras(context, filterBy = null) {
            const eventeras = await eventeraService.query(filterBy)
            context.commit({ type: 'setEventeras', eventeras })
        },
        // this should be 'loadEventeraById'  
        // and the evetnteraDetails should take it with a getter
        async getEventeraById(context, { _id }) {
            console.log('in store getbyid')

            let eventera = await eventeraService.getById(_id);
            return eventera;
        }
    },
}