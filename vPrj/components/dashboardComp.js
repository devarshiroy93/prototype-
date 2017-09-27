var dashboardComp = Vue.component('dash-comp', {

    template: `<div class="container dashboard">
                <div class ="col-lg-3 col-md-3 col-sm-3 col-xs-12 sidebar-content" :class = 'mobile'><sidebar-comp :userData = data.providerData[0] :userUid = data.uid></sidebar-comp></div>
                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 user-posts">
				<snackbar-comp :triggered = snackbarTriggered :action=snackBarAction></snackbar-comp>
                    <div v-if="data!== undefined" >
                     <div v-if ="data.emailVerified"><alert-comp :visibility = data.emailVerified :state = "state" :userName = data.providerData[0].displayName></alert-comp></div>
						<search-comp></search-comp>
                        <create-post :userinfo=data></create-post>
						<post-card :userUid=data.uid   v-on:add-friend = "addFriend($event)" v-on:postcard-created = "passData"></post-card>
				    </div>
                </div>
            </div>`,
    data: function () {
        return {
            state: 'info',
            data: store.getters.getCurrentUser,
            isMobileView: store.getters.getCurrentView,
            mobile: '',
			snackbarTriggered : false,
			snackBarAction : '',
			friendList : [],
        }
    },
	methods :{
		addFriend : function($event){
			
			var freindRequestSatus = sendFriendRequest($event);
			freindRequestSatus.then(function(status){
				if (status.database){
					this.snackBarAction = 'addFriend';
					this.snackbarTriggered = true ;
				}
			}.bind(this))
		},
        passData : function(){
            console.log('caught')
        }
	},

    created: function () {
        if (this.data.uid === undefined) {
            router.push('login')
        }
       this.data.uid ? checkIfUserExists(this.data.uid, this.data):''; //this function checks if user exits in database or not .If not then pushes user data into database.
        console.log(this.isMobileView);
        this.isMobileView ? this.mobile = 'hidden-xs' : this.mobile = '';

		//code for loading friends
		
		firebase.database().ref('friends/'+this.data.uid).on('child_added',function(snapshot){
			this.friendList.push(snapshot.val());
			store.commit('assignFriends', this.friendList)
			}.bind(this))
		
		//code for loading friends ends
        store.watch(function (state) {
            return state.toggleView
        }, function (data) {
            console.log(data)
            data ? this.mobile = '' : this.mobile = 'hidden-xs'
        }.bind(this))
    }

})
