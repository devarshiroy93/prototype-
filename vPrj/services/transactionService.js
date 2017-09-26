commentCountTransaction = function(ref,postKey){
return firebase.database().ref('posts/'+ref).child(postKey).child('commentCount').transaction(function(count){
    return count+1
})
}