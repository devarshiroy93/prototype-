function checkIfUserExists(uid,userData){
	var userUid = uid;
	var ref = firebase.database().ref("users/");
	ref.once("value").then(function(snapshot) {
				snapshot.hasChild(userUid) ? '': pushUserData(userData) ;
					
  });
	
};

function pushUserData(userData){
	var userDataObj = userData.providerData[0];
	var userIdentifier = userDataObj.uid.toString();
	
	firebase.database().ref("users/"+userData.uid).set(
	
														{
														'displayName' : userDataObj.displayName !==null? userDataObj.displayName : '' ,
														'email':userDataObj.email !==null? userDataObj.email : '',
														'providerId' : userDataObj.providerId !==null? userDataObj.providerId : '',
														'phoneNumber' : userDataObj.phoneNumber !==null? userDataObj.displayName : '',
														'uid' : userDataObj.uid !==null? userDataObj.uid : ''
														}
						
													  )
};
function pushPostIntoDatabase(postTitle,postBody,userUid,photoURL) {
	var postObj = {
					title : postTitle,
					body : postBody ,
					createdby : userUid,
					authorPic : photoURL,
					timeStamp : Date.now(),
				  }
	var postId = generateUniquePostId();
	 return firebase.database().ref("posts/").push(postObj).then(function(result){
		return result;
	}).catch(function(error){
		return error;
	})
	
};
