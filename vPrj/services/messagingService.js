messagingService = {
    getMessages: function (userId) {

    },
    pushMessage: function (messageObj) {
        var parent;
        var recipient;
        var senderId;
        var unreadMessage
        parent = "conversations";
        recipientId = messageObj.recipient;
        senderId = messageObj.userSenderId;
        text = messageObj.text;
        firebase.database().ref(parent+'/'+recipientId+'__'+senderId).push(messageObj).then(function(result){
            if(result.database){
                messagingService.pushConvIdIntoDatabase(messageObj,result.key)
            }
        });
    },
    pushConvIdIntoDatabase : function(messageObj,key){
        var recipient;
        var senderId;
        var unreadMessag;
        recipientId = messageObj.recipient;
        senderId = messageObj.userSenderId;
        text = messageObj.text;
        firebase.database().ref('convByUsers'+'/'+recipientId).set({'key' : key});
        firebase.database().ref('convByUsers'+'/'+senderId).set({'key' : key});
        messagingService.incrementUnreadMessageCount(messageObj,key);
    },

    incrementUnreadMessageCount : function(messageObj,key){
             firebase.database().ref('convByUsers'+'/'+messageObj.recipientId).child('unreadMessageCount').transaction(function(count){
                 count+1;
             });
    }
}