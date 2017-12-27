var messenger = Vue.component('messaging-comp', {
    props: [],
    template: `<div>
                    <div class="messagingComp col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div><message-list v-on:newmessagetoggle = "showCreateMessageComp" :messageData = "messageData" @selected-user = passToMessagePanel($event) @play-notif="playNotification"></message-list></div>
                        <div><message-panel :showComp = "!showCreateComp" :recipient="recipientUser" :convMsgList = "conversationMsgs"  @send-click = sendMessage($event)></message-panel></div>
                        <div><create-message :showComp= "showCreateComp" @recipient-user="passToMessagePanel($event)"></create-message></div>
                        <div><audio ref="audioElm" src="asset/msgNoti.mp3"></audio></div>
                    </div>   
                </div>`,
    data: function () {
        return {
            showCreateComp: false,
            recipientUser: [],
            messageData: [] ,//the data here will be rendered as message list in message component,
            conversationMsgs : []//contains the messages in a particular converation
        }
    },
    methods: {
        showCreateMessageComp: function () {
            this.showCreateComp = true
        },
        passToMessagePanel: function (user) {
            user !== undefined ? this.recipientUser = user : '';
            this.showCreateComp = false;
            this.fetchMessageListOfConversation(user) ;
            user.type === 'userSelected' ? messagingService.resetUnReadMessageCountOfaParticularConversation(store.getters.getCurrentUser.uid,user.convKey) : '';
        },
        sendMessage: function (payload) {
            var key = payload.key? payload.key : '';
            delete payload.key;
            messagingService.pushMessage(payload,key);
        },
        playNotification : function(){
            this.$refs.audioElm.play();
        },
        fetchMessageListOfConversation : function(userObj){
           var parent ;
           var recipient;
           var senderId;
           recipientId = userObj.uid;
           senderId = store.getters.getCurrentUser.uid;
           if(store.getters.getSelectedConversation){
               firebase.database().ref(store.getters.getSelectedConversation).off();
           }
           userObj.convKey ? parent = 'conversations'+'/'+userObj.convKey :  parent = 'conversations'+'/'+recipientId+'__'+senderId ;
           store.commit('assignSelectedConversation',parent);
           this.conversationMsgs = [];
           firebase.database().ref(parent).on('child_added',function(snap){
            this.conversationMsgs.push(snap.val());
           }.bind(this))
        },
        fetchMessageList : function(){
            firebase.database().ref('convByUsers/' + store.getters.getCurrentUser.uid).on('child_added', function (data) {
                messagingService.fetchLastMessageOfConverstion(data.val().parent).then(function (data) {   
                    this.messageData.push(data);
                    this.recipientUser.convKey = data.key
                }.bind(this));
            }.bind(this))
        }


    },
    created: function () {
        var messagesData = [];
        var senderData = [];
        var unreadMessageCount = [];
        var key;
        this.fetchMessageList();      
    }
})
