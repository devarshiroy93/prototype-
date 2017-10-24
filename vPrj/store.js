const store = new Vuex.Store({
    state: {
        user: {},
        isMobile: false,
        toggleView: false,
        commentList: [],
        currentPostKey: '',
        friendList: [],
        friendsNotifications: [],
        postNotifications: []
    },
    mutations: {
        assignCurrentUser(state, user) {
            state.user = user;
        },
        assignView(state, view) {
            state.isMobile = view;
        },
        assignToggleForMobile(state, view) {
            state.toggleView = view;
        },
        assignCommentList(state, commentList) {
            state.commentList = commentList;
        },
        assignCurrentPostKey(state, key) {
            state.currentPostKey = key;
        },
        assignFriends(state, friendList) {
            state.friendList = friendList;
        },
        assignFriendsNotifications(state, friendsNotifications) {
            state.friendsNotifications = friendsNotifications
        },
        assignPostNotifications(state, postNotifications) {
            state.postNotifications = postNotifications
        }



    },
    getters: {
        getCurrentUser(state) {
            return state.user;
        },
        getCurrentView(state) {
            return state.isMobile;
        },
        getToggledState(state, view) {
            return state.toggleView
        },
        getCommentlistofPost(state) {
            return state.commentList
        },
        getCurrentPostKey(state) {
            return state.currentPostKey
        },
        getFriends(state) {
            return state.friendList;
        },
        getFriendsNotifications(state) {
            return state.friendsNotifications
        },
        getPostNotifications(state) {
            return state.PostNotifications
        },
    }

})
