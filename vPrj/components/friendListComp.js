var friendListComp = Vue.component('friend-list',{
'props' : ['userUid'],
'template' : `<div>
				<div class="col-md-2"></div>
				<div class="col-md-8 col-sm-12 col-xs-12" >Friend Requests
				<ul class = "list-group">
					<div v-if="showRequestSection">
						<div v-for = "request in friendRequests" >
							<div>{{request.displayName}}</div>
							<p>{{request.email}}</p>
					</div>
				</ul>
				</div>
				<div class="col-md-2"></div>
			</div>`,
 data: function () {
        return {
			showRequestSection : false,
			friendRequests : []
        }
    },
	methods : {
		fetchUsersInfo : function(from){
			firebase.database().ref('users').child(from).once('value').then(function(snapshot){
				console.log(snapshot.val());
				this.showRequestSection = true
				this.friendRequests.push(snapshot.val())
			}.bind(this))
		}
	},
	created : function(){
		this.$route.params.id
		firebase.database().ref('friendRequests/'+this.$route.params.id).on('child_added',function(snapshot){
			console.log(snapshot.val());
			this.fetchUsersInfo(snapshot.val().from);
			}.bind(this))
	}
}
)