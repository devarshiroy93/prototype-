var searchResults = Vue.component('searchresults-comp', {
	props: ['userId', 'searchString'],
	template: `<div>
					<snackbar-comp :triggered = snackbarTriggered :action=snackBarAction></snackbar-comp>
					<div class="col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-sm-offset-2 col-sm-10 col-xs-12">
						<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12 otherUserComment friendRequest">
							<p class="subheader">Results</p>
							<hr class="divider">
							<p v-if= "searchResults.length == 0" class="body2">There are no records found.</p>
							<div v-else-if='searchResults.length !== 0'>
							<div v-for="user in searchResults"  >
								<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 searchFriendResult"><user-cards :friend = "user"></user-Cards><easy-friend :userId = userIdTemp :postAuthor = user.uid v-on:add-friend = "addFriend($event)" ></easy-friend></div>
							</div>	
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
			searchResults: [],
			snackbarTriggered: false,
			snackBarAction: '',
			userIdTemp : '', // patch for prop value coming as undefined
			addFriendDetails : {}
		}
	},
	methods: {
		compareQuery: function (user) {
			if (user.displayName.toLowerCase().indexOf(this.searchStringTemp.toLowerCase()) !== -1) {
				console.log(user.displayName)
				this.searchResults.push(user)
			}
		},
		addFriend: function ($event) {
			var friendRequestSatus = sendFriendRequest($event);
			this.addFriendDetails = $event
			friendRequestSatus.then(function (status) {
				if (status.database) {
					transactionforFriendRequest(this.addFriendDetails.postAuthor);
					this.snackBarAction = 'addFriend';
					this.snackbarTriggered = true;
				}
			}.bind(this))
		},
	},
	created: function () {
		this.userIdTemp = this.userId; // patch for prop value coming undefined
		this.searchStringTemp = this.searchString; // patch for prop value coming undefined
		firebase.database().ref('users').on('child_added', function (snapshot) {
			this.compareQuery(snapshot.val())
		}.bind(this))
	}
})