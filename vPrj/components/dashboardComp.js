var dashboardComp = Vue.component('dash-comp',{
props : ['user'],
template : `<div>
                <div class ="col-md-3 col-xs-12"><sidebar-comp :userData = user.providerData[0]></sidebar-comp></div>
                <div class="col-md-8 col-xs-12">
                    <div v-if="user.providerData[0] !== undefined" >
				        <h3>Welcome to Dashboard</h3><h1>{{user.providerData[0].displayName}}</h1>
				    </div>
                </div>
                <div class ="col-md-1 col-xs-12"> 
                <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login btn-success" value="Log Out" v-on:click="gSignOut()">
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
},
    created:function(){
        debugger
        if(this.$route.params.user === undefined){
            router.push('login')
        }
    }
										
})