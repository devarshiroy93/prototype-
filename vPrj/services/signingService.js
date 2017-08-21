function signingInService(){
    
    var provider = new firebase.auth.GoogleAuthProvider();
					return firebase.auth()
					.signInWithPopup(provider).then(function(result) {
						return result
						})
						.catch(function(error) {
						return error
						});
};

function singingOutService(){
    firebase.auth().signOut()
   .then(function() {
      console.log('Signout Succesfull')
	  router.push('login')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
