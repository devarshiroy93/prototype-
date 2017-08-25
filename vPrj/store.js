const store = new Vuex.Store({
    state: {
        user: {},
        isMobile: false
    },
    mutations: {
        assignCurrentUser(state, user) {
            state.user = user;
        },
        assignView(state, view) {
            state.isMobile = view;
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.user;
        },
        getCurrentView(state) {
            return state.isMobile;
        }
    }

})