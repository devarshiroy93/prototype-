function pushUserData(userData){
	var database = firebase.database(); 
	var userDataObj = userData.providerData[0];
	var userIdentifier = userDataObj.uid.toString();
	
	firebase.database().ref("users/"+userData.uid).set(
	
														{'displayName' : userDataObj.displayName !==null? userDataObj.displayName : '' ,
														'email':userDataObj.email !==null? userDataObj.email : '',
														'photoURL' : userDataObj.photoURL !==null? userDataObj.photoURL : '',
														'providerId' : userDataObj.providerId !==null? userDataObj.providerId : '',
														'phoneNumber' : userDataObj.phoneNumber !==null? userDataObj.displayName : '',
														'uid' : userDataObj.uid !==null? userDataObj.uid : ''
														}
						
													  )
}