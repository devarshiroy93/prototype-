transactionServiceFunction = function(ref,postKey,action){
	var actions = {'like' : 'likeCount',
				   'comment' : 'commentCount'
				}
	if(action === "comment"){
		return firebase.database().ref('posts/'+ref).child(postKey).child(actions[action]).transaction(function(count){
			return count+1;
				})
			}
	else if(action === "like"){
			return firebase.database().ref(ref).child('likesCount').child(postKey).child(actions[action]).transaction(function(count){
					return count+1;
			})
		}
}
var transactionforFriendRequest = function(requestReceiver){
	return firebase.database().ref('friendRequests').child('friendRequestsCount').child(requestReceiver).transaction(function(count){
					return count+1;
			})
}
var negativeTransactionForLikeCount = function(id){
	return firebase.database().ref('friendRequests').child('friendRequestsCount').child(id).transaction(function(count){
		return count-1;
})
}
var updateCommentNotifcation = function(user,postKey){
	return firebase.database().ref('notifications/postActivityNotifications'+'/'+user+'/' ).child('postActivityCount').child(postKey).transaction(function(count){
		return count+1;
	})
}