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
    fetchLastMessageOfConverstion : function(key){
            parent ='lastMessageSet/'+key;
            return firebase.database().ref(parent).once('value').then(function(snap){
                return {'data' : snap.val(),'key':snap.key};
             }).catch(function(error){
                 alert('data not retrieved1')
             })
    },
    fetchUnreadMessageCountList : function(key,userId){
        parent = 'unreadMessageCountList'+'/'+userId+'/'+key;
        return firebase.database().ref(parent).once('value').then(function(data){
            return {'data' :data.val(),'key' :data.key};
        })
    },
    fetchConversation : function(messageObject){
        var parent;
        var recipient;
        var senderId;
        recipientId = messageObj.recipient;
        senderId = messageObj.userSenderId;
        parent = 'conversations'+'/'+recipientId+'__'+senderId;
        return firebase.database().ref(parent).once('value').then(function(data){
            return data.val();
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
    pushMessage: function (messageObj,key) {
        var parent;
        var recipient;
        var senderId;
        parent = "conversations";
        recipientId = messageObj.recipient;
        senderId = messageObj.userSenderId;
        text = messageObj.text;
        if(key !== ""){
            parent = parent + '/' + key
        }else{
            parent =  parent+'/'+recipientId+'__'+senderId;
        } 
        firebase.database().ref(parent).push(messageObj).then(function(result){
            if(result.database){
               key ? '': messagingService.pushConvIdIntoDatabase(messageObj,result.key);
                messagingService.setLastMessage(messageObj,key)
            }
        });
    },
    setLastMessage : function(messageObj,key){
        var parent;
        var recipient;
        var senderId;
        parent = "lastMessageSet";
        recipientId = messageObj.recipient;
        senderId = messageObj.userSenderId;
        text = messageObj.text;
         if(key !== ""){
            parent = parent + '/' + key
        }else{
            parent =   parent+'/'+recipientId+'__'+senderId;
        } 
        firebase.database().ref(parent).set(messageObj);
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