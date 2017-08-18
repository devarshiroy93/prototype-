var dashboardComp = Vue.component('dash-comp',{
props : ['user'],
template : `<div>
                <div class ="col-md-3 col-sm-3 col-xs-12 sidebar-content">
                    <sidebar-comp :userData = user.providerData[0]></sidebar-comp>
                </div>
                <div class="col-md-7 col-sm-7 col-xs-12 user-posts">
                    <div v-if="user.providerData[0] !== undefined" >
						<create-post :userUid=user.uid></create-post>
						<post-card :userUid=user.uid></post-card>
				    </div>
                </div>
            </div>`,
										

    created:function(){
        if(this.$route.params.user === undefined){
            router.push('login')
        }
		//checkIfUserExists(this.$route.params.user.uid, this.$route.params.user);//this function checks if user exits in database or not .If not then pushes user data into database.
    }
										
})
