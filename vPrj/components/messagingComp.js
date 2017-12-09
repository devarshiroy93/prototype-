var messenger = Vue.component('messaging-comp', {
    props: [],
    template: `<div>
                    <div class="messagingComp col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div><message-list v-on:newmessagetoggle = "showCreateMessageComp" :messageData = "messageData" ></message-list></div>
                        <div><message-panel :showComp = "!showCreateComp" :recipient="recipientUser" @send-click = sendMessage($event)></message-panel></div>
                        <div><create-message :showComp= "showCreateComp" @recipient-user="passToMessagePanel($event)"></create-message></div>
                    </div>   
                </div>`,
    data: function () {
        return {
            showCreateComp: false,
            recipientUser: [],
            messageData : [] //the data here will be rendered as message list in message component
        }
    },
    methods: {
        showCreateMessageComp: function () {
            this.showCreateComp = true
        },
        passToMessagePanel: function (user) {
            user !== undefined ? this.recipientUser = user : '';
            this.showCreateComp = false;
        },
        sendMessage: function (payload) {
            console.log(payload);
            messagingService.pushMessage(payload);
        }


    },
    created: function () {
        var messagesData = [];
        var senderData = [];
        var unreadMessageCount = [];
        var key ;
        messagingService.getMessageOverViewList(store.getters.getCurrentUser.uid).then(function (data) { // data retriveal code from firebase
            simplifyFirebaseArray(data).map(function (item) {
                messagingService.fetchLastMessageOfConverstion(item).then(function (msgData) {
                    messagesData.push(msgData);
                        store.getters.getCurrentUser.uid === msgData.userSenderId ? key = msgData.recipient :  key = msgData.userSenderId;
                    fetchUserData(key).then(function(data){
                        senderData.push(data);
                        this.messageData = messagingService.structureMessageUserData(messagesData,senderData,store.getters.getCurrentUser.uid);
                        console.log(this.messageData);
                    }.bind(this))//unread message count list data fetch is done from a child compont.
                }.bind(this))
            }.bind(this))
        }.bind(this));
    }
})
