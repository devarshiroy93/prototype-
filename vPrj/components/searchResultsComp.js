var searchResults = Vue.component('searchresults-comp',{
	props : ['searchString'],
	template : `<div>
					<div class="col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-sm-offset-2 col-sm-10 col-xs-12">
						<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12 otherUserComment friendRequest">
							<p class="subheader">Results</p>
							<hr class="divider">
								<user-cards :userItems = "searchResults"></user-Cards>
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
			searchResults : []
        }
    },
	methods :{
		compareQuery : function(user){
			if(user.displayName.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1){
				console.log(user.displayName)
				this.searchResults.push(user)
			}
		}
	},
	created : function(){
		firebase.database().ref('users').on('child_added',function(snapshot){
			this.compareQuery(snapshot.val())
		}.bind(this))
	}
})