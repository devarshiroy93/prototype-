var dashboardComp = Vue.component('dash-comp',{
props : ['user'],
template : `<div>
				<div>
				<h3>Welcome to Dashboard</h3><h1>{{user.providerData[0].displayName}}</h1>
				</div>
				<div class="row">
                     <div class="col-sm-6 col-sm-offset-3">
                         <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login btn-success" value="Log Out" v-on:click="gSignOut()">
                     </div>
                </div>
			</div>`,
										
methods :{
	
	gSignOut : function(){
		firebase.auth().signOut()
   .then(function() {
      console.log('Signout Succesfull')
	  router.push('login')
   }, function(error) {
      console.log('Signout Failed')  
   });
	}
}										
										
})