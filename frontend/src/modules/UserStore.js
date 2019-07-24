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
        currUser: null
    },
    getters: {
        loggedUser(state) {
            return state.loggedUser;
        },
        loc(state) {
            return state.loggedUser.loc;
        },
        currUser(state) {
            return state.currUser
        }
    },
    mutations: {
        setLoggedUser(state, { user }) {
            state.loggedUser = user;
        },
        setLocation(state, { loc }) {
            state.loggedUser.loc = loc;
        },
        setCurrUser(state, { user }) {
            state.currUser = user;
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
        async saveUserProfileImg(context, { profileImgUrl }) {
            try {
                console.log('saveUserProfileImg called got:', profileImgUrl)
                let user = Object.assign({}, context.getters.loggedUser);
                user.profileImgUrl = profileImgUrl;
                console.log(user);
                user = await userService.update(user);
                context.commit({ type: 'setLoggedUser', user });
            } catch (err) {
                console.log('had problems saveUserProfileImg    ', err);
            }
        },
        async loadLoggedUser(context) {
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
        },
        async loadCurrUser(context, { id }) {
            try {
                const user =  await userService.getById(id);
                context.commit({ type: "setCurrUser", user })
            } catch (err) {
                context.commit({ type: "setCurrUser", user: null })
                throw err;
            }

        }
    },
}
