Vue.component('sidebar-comp',{
props: ['userData'],
template : `<div>
                    <div class="">
                        <img class="card-img-top sideBarImgClass" :src="userData.photoURL" alt="Card image cap">
					<div class="userInfo interactive-text">
						<p>{{userData.displayName}}</p>
						<p>{{userData.email}}</p>
					</div>		
						 <div class="card-block">
                                <ul class="sidebar-comp interactive-text">
                                    <li><i class="material-icons" aria-hidden="true">create</i>Edit Profile</li>
                                    <li><i class="material-icons" aria-hidden="true">local_post_office</i>Your Posts</li>
                                    <li><i class="material-icons" aria-hidden="true">supervisor_account</i>Friends</li>
                                     <li><i class="material-icons">message</i>Messages</li>
                                </ul>
                            </div>
                    </div>
				<div class ="col-md-12 col-sm-12 col-xs-6"> 
                <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-default interactive-text" value="Log Out" v-on:click="gSignOut()">
                </div>
			</div>`,
methods :{
	
	gSignOut : function(){
		var promise = singingOutService();
		promise.then(function(result){
			result? router.push('login') : alert('signout not successful')
		}.bind(this));
		
	}
},
})
