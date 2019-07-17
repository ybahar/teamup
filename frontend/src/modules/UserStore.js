import userService from '@/services/UserService'


export default {
    state: {
        loggedUser: {
            _id: "",
            username: '',
            name: "",
            email: "",
            phone: "",
            loc: {
                geo: {
                    lat: 59.3293,
                    lng: 18.0686
                },
                address: "",
                city: "",
                formatted_address: ""
            },
        },
    },
    getters: {
        loggedUser(state) {
            return state.loggedUser;
        },
        loc(state) {
            return state.loggedUser.loc;
        }
    },
    mutations: {
        setLoggedUser(state, { user }) {
            state.loggedUser = user;
        },
        setLocation(state, { geo, address }) {
            state.loggedUser.loc.geo = geo;
            state.loggedUser.loc.address = address;
        }
    },
    actions: {
        async saveUserBasics(context, { name, email, phone }) {
            try {
                let user = Object.assign({}, context.getters.loggedUser);
                user.name = name;
                user.email = email;
                user.phone = phone;
                user = await userService.update(user);
                context.commit({ type: 'setLoggedUser', user });
            } catch (err) {
                console.log('had problems saveUserBasics', err);
            }
        },
        async loadLoggedUser(context) {
            try {
                const user = await userService.getLoggedUser();
                context.commit({ type: 'setLoggedUser', user });
            } catch (err) {
                console.log('had problems loadLoggedUser', err);
            }
        },
        async updateLocation(context, { geo, address }) {
            context.commit({ type: 'setLocation', geo, address })
            await userService.update(context.loggedUser); // returns an updated user, not gonna use
        }
    },
}
