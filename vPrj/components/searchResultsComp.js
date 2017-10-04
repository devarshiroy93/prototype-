var searchResults = Vue.component('searchresults-comp',{
	props : ['userId','searchString'],
	template : `<div>
					<snackbar-comp :triggered = snackbarTriggered :action=snackBarAction></snackbar-comp>
					<div class="col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-sm-offset-2 col-sm-10 col-xs-12">
						<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12 otherUserComment friendRequest">
							<p class="subheader">Results</p>
							<hr class="divider">
							<div v-for="user in searchResults">
								<div><user-cards :friend = "user"></user-Cards><easy-friend :userId = userId :postAuthor = user.uid v-on:add-friend = "addFriend($event)" ></easy-friend></div>
							</div>	
						</div>
						<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12 otherUserComment friendRequest">
							<div class = "col-lg-12 col-md-12 col-sm-12 recentSearchResult">
								<p class="subheader">Recent Searches</p>
								<hr class="divider">
								<p class="body2">There are no records found.</p>
							</div>
						</div>
					</div>
				</div>`,
data: function () {
        return {
			searchResults : [],
			snackbarTriggered : false,
			snackBarAction : '',
        }
    },
	methods :{
		compareQuery : function(user){
			if(user.displayName.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1){
				console.log(user.displayName)
				this.searchResults.push(user)
			}
		},
		addFriend : function($event){
			
			var freindRequestSatus = sendFriendRequest($event);
			freindRequestSatus.then(function(status){
				if (status.database){
					this.snackBarAction = 'addFriend';
					this.snackbarTriggered = true ;
				}
			}.bind(this))
		},
	},
	created : function(){
		firebase.database().ref('users').on('child_added',function(snapshot){
			this.compareQuery(snapshot.val())
		}.bind(this))
	}
})