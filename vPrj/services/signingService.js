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
						})
						.catch(function(error) {
							debugger
						
						var errorCode = error.code;
						if(router.currentRoute.path === "/"){
							router.push({ name: 'login', params: {message: true }})
						}
						else{
							router.push({ name: 'index', params: {message: true }})
						}
						var errorMessage = error.message;
						console.log(error.code);
						console.log(error.message)
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
