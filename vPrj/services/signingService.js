function signingInService(router,fn){
    
    var provider = new firebase.auth.GoogleAuthProvider();
					var self= this;
					firebase.auth()
					.signInWithPopup(provider).then(function(result) {
						var token = result.credential.accessToken;
						var user = result.user;
						console.log(token);
						console.log(user)
                        router.push({ name: 'dashboard', params: {user: user }})//redirects to login page on successfull login
						}).catch(function(error) {
							self.error = true
							console.log(self.error)
							var errorCode = error.code;
							var errorMessage = error.message;
							console.log(error.code);
							console.log(error.message)
							
							debugger
							router.push({ name: 'login', params: {message: true }})
							});
}

function singingOutService(){
    firebase.auth().signOut()
   .then(function() {
      console.log('Signout Succesfull')
	  router.push('login')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
