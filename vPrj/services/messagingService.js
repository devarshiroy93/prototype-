messagingService = {
    getMessageOverViewList: function (userId) {
        var parent;
        parent = 'convByUsers/'+userId
       return  firebase.database().ref(parent).once('value').then(function(data){
          return  data.val();
        }).catch(function(error){
            alert('data not retrieved')
        })
    },
    fetchLastMessageOfConverstion : function(item){
            parent ='conversations/'+item.parent+'/'+item.key;
            return firebase.database().ref(parent).once('value').then(function(snap){
                return snap.val();
             }).catch(function(error){
                 alert('data not retrieved1')
             })
    },
    fetchUnreadMessageCountList : function(messageObj,userId){
        var parent;
        var recipient;
        var senderId;
        recipientId = messageObj.recipient;
        senderId = messageObj.userSenderId;
        parent = 'unreadMessageCountList'+'/'+userId+'/'+recipientId+'__'+senderId;
        return firebase.database().ref(parent).once('value').then(function(data){
            return {'data' :data.val(),'key' :data.key};
        })
    },

    structureMessageUserData : function(messageData,senderData,currentUser){
    var key ;
       for(var i = 0 ;i<messageData.length;i++){
        currentUser === messageData[i].userSenderId ? key = 'recipient':key = 'userSenderId';
           for(var x =0 ;x<senderData.length;x++){
            if(messageData[i][key] === senderData[x].uid) {
                messageData[i].displayDetails = senderData[x];
            }
        }
       }
       return messageData;
    },
    pushMessage: function (messageObj) {
        var parent;
        var recipient;
        var senderId;
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
        firebase.database().ref('convByUsers'+'/'+recipientId).push({'parent' :recipientId+'__'+senderId ,'key' : key});
        firebase.database().ref('convByUsers'+'/'+senderId).push({'parent' :recipientId+'__'+senderId,'key' : key});
        messagingService.incrementUnreadMessageCount(messageObj,key);
    },

    incrementUnreadMessageCount : function(messageObj,key){
        var recipient;
        var senderId;
        var unreadMessage;
        var convId;
        recipientId = messageObj.recipient;
        senderId = messageObj.userSenderId;
        parent = 'unreadMessageCountList/' +recipientId;
        convId =  recipientId+'__'+senderId;
        firebase.database().ref(parent).child(convId).transaction(function(count){
           return count+1;
        })

    }
}