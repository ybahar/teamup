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
                    lat: 0,
                    lng: 0
                },
                address: "",
                city: ""
            },
        },
    },
    getters: {
        loggedUser(state) {
            return state.loggedUser;
        }
    },
    mutations: {
        setLoggedUser(state, { user }) {
            state.loggedUser = user;
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
        }
    },
}
