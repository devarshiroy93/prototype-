commentCountTransaction = function(postKey){
return firebase.database().ref('posts/'+postKey).child('commentCount').transaction(function(count){
    return count+1
})
}