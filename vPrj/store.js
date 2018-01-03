const store = new Vuex.Store({
    state: {
        user: {},
        isMobile: false,
        toggleView: false,
        commentList: [],
        currentPostKey: '',
        friendList: [],
        friendsNotifications: [],
        postNotifications: [],
        selectedConversation : '',
        conversationList :[],
        unreadMessageCount : {}
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
        },
        assignSelectedConversation(state,convId){
            state.selectedConversation = convId;
        },
        assignCoversationList(state,conversation){
            state.conversationList.push(conversation);
        },
        assignUnreadMessageCount(state,unreadMessage){
            state.unreadMessageCount = unreadMessage;
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
            return state.toggleView;
        },
        getCommentlistofPost(state) {
            return state.commentList;
        },
        getCurrentPostKey(state) {
            return state.currentPostKey;
        },
        getFriends(state) {
            return state.friendList;
        },
        getFriendsNotifications(state) {
            return state.friendsNotifications;
        },
        getPostNotifications(state) {
            return state.PostNotifications;
        },
        getSelectedConversation(state){
            return state.selectedConversation;
        },
        getUnreadMessageCount(state){
            return state.unreadMessageCount;
        }
    }

})
