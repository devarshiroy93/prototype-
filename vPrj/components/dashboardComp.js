var dashboardComp = Vue.component('dash-comp',{
props : ['user'],
template : `<div class="container dashboard">
                <div class ="col-md-2 col-sm-3 col-xs-12 col-lg-3 sidebar-content"><sidebar-comp :userData = user.providerData[0]></sidebar-comp></div>
                <div class="col-md-7 col-sm-8 col-xs-12 user-posts">
                    <div v-if="user.providerData[0] !== undefined" >
                        <div v-if ="user.emailVerified"><alert-comp :visibility = user.emailVerified :state = "state" :userName = user.providerData[0].displayName></alert-comp></div>
						<create-post :userinfo=user></create-post>
						<post-card :userUid=user.uid></post-card>
				    </div>
                </div>
            </div>`,
    data: function () {
			return {
                state : 'info'
			}
		},

    created:function(){
        if(this.$route.params.user === undefined){
            router.push('login')
        }
		checkIfUserExists(this.$route.params.user.uid, this.$route.params.user);//this function checks if user exits in database or not .If not then pushes user data into database.
    }
										
})
