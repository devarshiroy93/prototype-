var messenger = Vue.component('messaging-comp', {
    props: [],
    template: `<div>
                    <div class="messagingComp col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div><message-list v-on:newmessagetoggle = "showCreateMessageComp"></message-list></div>
                        <div><message-panel :showComp = "!showCreateComp" :recipient="recipientUser" @send-click = sendMessage($event)></message-panel></div>
                        <div><create-message :showComp= "showCreateComp" @recipient-user="passToMessagePanel($event)"></create-message></div>
                    </div>   
                </div>`,
    data: function () {
        return {
            showCreateComp: false,
            recipientUser: [],
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
        messagingService.getMessageOverViewList(store.getters.getCurrentUser.uid).then(function (data) {
            simplifyFirebaseArray(data).map(function (item) {
                messagingService.fetchLastMessageOfConverstion(item).then(function (msgData) {
                    console.log(msgData);
                    if (store.getters.getCurrentUser.uid === msgData.recipient) {
                        messagingService.fetchUnreadMessageCountList(msgData, store.getters.getCurrentUser.uid).then(function (data) {
                            console.log('unreadMsgcount',data);
                        });
                    }

                })
            }.bind(this))

        }.bind(this));
    }
})
