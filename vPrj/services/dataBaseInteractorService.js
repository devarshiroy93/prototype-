function checkIfUserExists(uid, userData) {
    var userUid = uid;
    var ref = firebase.database().ref("users/");
    ref.once("value").then(function (snapshot) {
        snapshot.hasChild(userUid) ? '' : pushUserData(userData);

    });

};

function pushUserData(userData) {
    var userDataObj = userData.providerData[0];
    var userIdentifier = userDataObj.uid.toString();

    firebase.database().ref("users/" + userData.uid).set(

        {
            'displayName': userDataObj.displayName !== null ? userDataObj.displayName : '',
            'email': userDataObj.email !== null ? userDataObj.email : '',
            'providerId': userDataObj.providerId !== null ? userDataObj.providerId : '',
            'phoneNumber': userDataObj.phoneNumber !== null ? userDataObj.displayName : '',
            'photoURL' : userDataObj.photoURL !== null ? userDataObj.photoURL : '',
            'uid': userData.uid !== null ? userData.uid : ''
        }

    )
};

function pushPostIntoDatabase(postBody,isChopped, user, photoURL) {
    var postObj = {
        body: postBody,
        createdby: user.uid,
        authorPic: photoURL,
        authorName: user.displayName,
        commentCount : 0,
		isChopped :isChopped,
        timeStamp: Date.now(),
		
    }
    return firebase.database().ref("posts/").push(postObj).then(function (result) {
        return result;
    }).catch(function (error) {
        return error;
    })

};
 function pushLongTextBodyintoDatabase(commentLongBody,postKey){
	 var postContentObj ={'body' : commentLongBody }
	  firebase.database().ref("longPostTexts/"+postKey).set(postContentObj);
};

function pushCommentsIntoDataBase(commentData, id) {
    var id = id;
    console.log(commentData);
    return firebase.database().ref('comments/' + id).push({
        'author': commentData.author,
        'body': commentData.body,
        'timeStamp': commentData.timeStamp
    }).then(function (result) {
        return true
    }).catch(function (error) {
        return false
    })
}
