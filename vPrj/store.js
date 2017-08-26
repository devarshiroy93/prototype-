const store = new Vuex.Store({
    state: {
        user: {},
        isMobile: false,
        toggleView : false 
    },
    mutations: {
        assignCurrentUser(state, user) {
            state.user = user;
        },
        assignView(state, view) {
            state.isMobile = view;
        },
        assignToggleForMobile (state,view){
            state.toggleView = view
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.user;
        },
        getCurrentView(state) {
            return state.isMobile;
        },
        getToggledState(state,view) {
            return state.toggleView
        }
    }

})
