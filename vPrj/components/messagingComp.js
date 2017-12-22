var messenger = Vue.component('messaging-comp', {
    props: [],
    template: `<div>
                    <div class="messagingComp col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div><message-list v-on:newmessagetoggle = "showCreateMessageComp" :messageData = "messageData" @selected-user = passToMessagePanel($event)></message-list></div>
                        <div><message-panel :showComp = "!showCreateComp" :recipient="recipientUser" :convMsgList = "conversationMsgs"  @send-click = sendMessage($event)></message-panel></div>
                        <div><create-message :showComp= "showCreateComp" @recipient-user="passToMessagePanel($event)"></create-message></div>
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
            this.fetchMessageListOfConversation(user)
        },
        sendMessage: function (payload) {
            var key = payload.key? payload.key : '';
            delete payload.key;
            messagingService.pushMessage(payload,key);
        },
        fetchMessageListOfConversation : function(userObj){
           console.log(userObj);
           parent = 'conversations'+'/'+userObj.convKey;
           this.conversationMsgs = [];
           firebase.database().ref(parent).on('child_added',function(snap){
            this.conversationMsgs.push(snap.val());
           }.bind(this))
        },
        fetchMessageList : function(){
            firebase.database().ref('convByUsers/' + store.getters.getCurrentUser.uid).on('child_added', function (data) {
                messagingService.fetchLastMessageOfConverstion(data.val().parent).then(function (data) {   
                    this.messageData.push(data);
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
