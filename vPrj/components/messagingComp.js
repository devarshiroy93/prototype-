var messenger = Vue.component('messaging-comp', {
    props: [],
    template: `<div>
                    <div class="messagingComp col-md-12 col-lg-12 col-sm-12 col-xs-12" v-heightwidth-manage="'messagingWindowHeight'">
                        <div v-if="showMessageList"><message-list v-on:newmessagetoggle = "showCreateMessageComp" :messageData = "messageData" @selected-user = passToMessagePanel($event) @play-notif="playNotification"></message-list></div>
                        <div v-if = "showConversation"><message-panel :showComp = "!showCreateComp" :recipient="recipientUser" :convMsgList = "conversationMsgs" :typingStatus = "typingStatus"  @send-click = sendMessage($event) @typing-indicator ="makeTypingIndicatorChanges($event)"></message-panel></div>
                        <div v-if = "showConversation"><create-message :showComp= "showCreateComp" @recipient-user="passToMessagePanel($event)"></create-message></div>
                        <div><audio ref="audioElm" src="asset/msgNoti.mp3"></audio></div>
                    </div>   
                </div>`,
    data: function () {
        return {
            showCreateComp: false,
            recipientUser: [],
            messageData: [],//the data here will be rendered as message list in message component,
            conversationMsgs: [],//contains the messages in a particular converation,
            typingStatus: false,
            showConversation: "",// determines whether to show conversation in mobile view or not,
            showMessageList : true//
        }
    },
    methods: {
        showCreateMessageComp: function () {
            this.showCreateComp = true;
            this.showConversation = true;
            store.getters.getCurrentView ? this.showMessageList = false : '' ;
        },
        passToMessagePanel: function (user) {
            this.showCreateComp ? user = this.checkIfConversationExists(user) : '';
            user !== undefined ? this.recipientUser = user : '';
            this.showCreateComp = false;
            if (store.getters.getSelectedConversation !== 'conversations/' + user.convKey) {
                this.fetchMessageListOfConversation(user);
            }
            if (user.type === 'userSelected') {
                messagingService.resetUnReadMessageCountOfaParticularConversation(store.getters.getCurrentUser.uid, user.convKey);
                this.handleViews(user.type);
            };
            this.bindTypingStatusChanges(user)
        },
        sendMessage: function (payload) {
            var key = payload.key ? payload.key : '';
            delete payload.key;
            messagingService.pushMessage(payload, key);
        },
        playNotification: function () {
            this.$refs.audioElm.play();
        },
        fetchMessageListOfConversation: function (userObj) {
            var parent;
            var recipient;
            var senderId;
            var convKey;
            convKey = userObj.convKey || userObj.key;
            recipientId = userObj.uid;
            senderId = store.getters.getCurrentUser.uid;
            if (store.getters.getSelectedConversation) {
                firebase.database().ref(store.getters.getSelectedConversation).off();
            }
            convKey ? parent = 'conversations' + '/' + convKey : parent = 'conversations' + '/' + recipientId + '__' + senderId;
            store.commit('assignSelectedConversation', parent);
            this.conversationMsgs = [];
            firebase.database().ref(parent).on('child_added', function (snap) {
                this.conversationMsgs.push(snap.val());

                var data = {};// part of typing indicator bug fix
                var uidArr = [];
                data.convKey = snap.ref.parent.key;// part of typing indicator bug fix
                uidArr = snap.ref.parent.key.split('__');// part of typing indicator bug fix
                for (var i = 0; i < uidArr.length; i++) {// part of typing indicator bug fix
                    uidArr[i] !== store.getters.getCurrentUser.uid ? data.uid = uidArr[i] : '';// part of typing indicator bug fix
                }
                this.bindTypingStatusChanges(data);// part of typing indicator bug fix

            }.bind(this))
        },
        fetchMessageList: function () {
            firebase.database().ref('convByUsers/' + store.getters.getCurrentUser.uid).on('child_added', function (data) {
                messagingService.fetchLastMessageOfConverstion(data.val().parent).then(function (data) {
                    this.messageData.push(data);
                    this.recipientUser.convKey = data.key
                }.bind(this));
            }.bind(this))

        },
        checkIfConversationExists: function (user) {// checks whether conversation already exits with selected user
            var userDetails;
            userDetails = user;
            for (var i = 0; i < this.messageData.length; i++) {
                if (this.messageData[i].key.toLowerCase().indexOf(user.uid.toLowerCase()) !== -1) {
                    userDetails = this.messageData[i];
                    userDetails.displayName = user.displayName;
                    userDetails.email = user.email;
                    userDetails.phoneNumber = user.phoneNumber
                    userDetails.photoURL = user.photoURL
                    userDetails.uid = user.uid
                } else {
                    userDetails = user;
                }
            }
            return userDetails;
        },
        handleViews: function (type) {
            if (type === "userSelected" && store.getters.getCurrentView) {
                this.showConversation = true;
                this.showMessageList = false
            }
            else {
                this.showConversation = !store.getters.getCurrentView;
            }

        },
        makeTypingIndicatorChanges: function (data) {//interacts with services to make changes in database for typing indicators
            console.log('typingIndicator', data);
            this.recipientUser.convKey ? messagingService.changeTypingStatus(this.recipientUser.convKey, store.getters.getCurrentUser.uid, data) : '';
        },
        bindTypingStatusChanges: function (data) {
            firebase.database().ref('typingStatus/' + data.convKey).child(data.uid).on('value', function (snap) {
                console.log('typingStatus', snap.val());
                this.typingStatus = snap.val();
            }.bind(this))
        }


    },
    created: function () {
        var messagesData = [];
        var senderData = [];
        var unreadMessageCount = [];
        var key;
        //this.fetchMessageList();
        //this.handleViews();
        firebase.auth().onAuthStateChanged(function(user){
                if(user){
                     store.commit('assignCurrentUser', user);
                     this.fetchMessageList();
                     this.handleViews();
                }else{
                };
            }.bind(this));
    }
})
