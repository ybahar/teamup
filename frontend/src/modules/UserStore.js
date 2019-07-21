import userService from '@/services/UserService'


export default {
    state: {
        loggedUser: {
            _id: "",
            // username: '',
            // name: "",
            // email: "",
            // phone: "",
            // loc: {
            //     geo: {
            //         lat: 59.3293,
            //         lng: 18.0686
            //     },
            //     address: "",
            //     city: "",
            //     formatted_address: ""
            // },
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
        setLocation(state, { loc }) {
            state.loggedUser.loc = loc;
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
            console.log('loadLoggedUser called');
            if (!context.getters.loggedUser._id) {
                try {
                    const user = await userService.getLoggedUser();
                    if (user) context.commit({ type: 'setLoggedUser', user });
                } catch (err) {
                    console.log('had problems loadLoggedUser', err);
                }

            }
        },
        async updateLocation(context, { loc }) {
            context.commit({ type: 'setLocation', loc })
            // without copying I get 'dont change state outside out of mutation' err
            const userCopy = JSON.parse(JSON.stringify(context.getters.loggedUser))
            await userService.update(userCopy); // returns an updated user, not gonna use
        }
    },
}
