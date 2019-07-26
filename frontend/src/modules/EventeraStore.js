import eventeraService from '@/services/EventeraService'
import cloudinaryService from '@/services/CloudinaryService'
import AlertService from '../services/AlertService';


export default {
    state: {
        eventeras: [],
        newEventera: { name },
        filterBy: {
            txt: '',
            category: 'General',
            almostFull: false,
            startingAt: 0,
            showClosed: false,
        },
        categories: ["Sport", "Music", 'Games', 'Self improvement', 'Hobbies'],
    },
    mutations: {
        saveEventera(state, { eventera, _id }) {
            console.log(_id);
            if (_id) {
                let idx = state.eventeras.findIndex((currEventera) => currEventera._id === _id)
                state.eventeras.splice(idx, 1, eventera)
            } else state.eventeras.push(eventera)

        },
        setEventeras(state, { eventeras }) {
            state.eventeras = eventeras;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        setFilterCategory(state, category) {
            // category = category.charAt(0).toUpperCase()
            state.filterBy.category = category;
            console.log('inside store:', state.filterBy.category );
            
        },
    },
    getters: {
        eventerasForDisplay(state) {
            return state.eventeras
        },
        getNewEventera(state) {
            return state.newEventera
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
            return state.categories;
        },
        selectedCategory(state) {
            return state.filterBy.category;
        },
        filterBy(state) {
            return state.filterBy;
        },
    },
    actions: {
        async saveEventera(context, eventera) {
            let updatedEventera;
            context.commit({type:'setLoading',isLoading:true})
            if (eventera._id) {
                updatedEventera = await eventeraService.update(eventera)
            } else {
                eventera.createdAt = Date.now();
                updatedEventera = await eventeraService.add(eventera)
            }
            context.commit({ type: 'saveEventera', eventera: updatedEventera, _id: eventera._id })
            context.commit({type:'setLoading',isLoading:false})
            return updatedEventera
        },
        async loadEventeras(context) {
            context.commit({type:'setLoading',isLoading:true})
            const filterBy = context.state.filterBy;
            const eventeras = await eventeraService.query(filterBy)
            context.commit({type:'setLoading',isLoading:false})
            context.commit({ type: 'setEventeras', eventeras })
        },
        async getEventeraById(context, { _id }) {
            context.commit({type:'setLoading',isLoading:true})
            try {
                let eventera = await eventeraService.getById(_id);
                context.commit({type:'setLoading',isLoading:false})
                return eventera;
            } catch (err) {
                context.commit({type:'setLoading',isLoading:false})
                console.log(err);
            }
        },
        
        async uploadToCloud(context, files) {
            context.commit({type:'setLoading',isLoading:true})
            let imgUrls = await cloudinaryService.uploadMedia(files)
            context.commit({type:'setLoading',isLoading:false})
            return imgUrls
        },
        async setFilter(context, { filterBy }) {
            context.commit({type:'setLoading',isLoading:true})
            return context.commit({ type: 'setFilter', filterBy })
        },
        async joinEventera(context, { _id }) {
            try{
                let updatedEventera = await eventeraService.join(_id);
                context.commit({ type: 'saveEventera', eventera: updatedEventera, _id })
                context.dispatch({type:'eventeraNotification',eventera:updatedEventera,method:'join'})
                console.log('after dispatch')
                return updatedEventera
            } catch(err){
                AlertService.err('Failed to join' , 'please try again later')
            }
        },
        async leaveEventera(context, { _id }) {
         try{
            let updatedEventera = await eventeraService.leave(_id);
            context.commit({ type: 'saveEventera', eventera: updatedEventera, _id })
            context.dispatch({type:'eventeraNotification',eventera:updatedEventera,method:'leave'})
            console.log('after dispatch')
            return updatedEventera
        }catch(err){
                AlertService.err('Failed to leave' , 'please try again later')
            }
        },
    },
}