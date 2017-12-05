messagingService = {
    getMessages: function () {

    },
    sendMessage: function (messageObj) {
        var parent;
        var recipient;
        var senderId;
        var unreadMessage
        parent = "conversations";
        unreadMessage = "unreadMessage";
        recipientId = messageObj.recipient;
        senderId = messageObj.userSenderId;
        text = messageObj.text;
        firebase.database().ref(parent).child(recipientId).child(senderId).child(unreadMessage).push({
            'message': text
        }).then(function (result) {
            firebase.database().ref(parent).child(recipientId).child('unreadMsgCount').transaction(function (count) {
                return count + 1;
            })
        }.bind(this))
    }
}