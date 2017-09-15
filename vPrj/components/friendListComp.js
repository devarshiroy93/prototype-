var friendListComp = Vue.component('friend-list',{
'props' : ['userUid'],
'template' : `<div>
				<div class="col-md-2"></div>
				<div class="col-md-8 col-sm-12 col-xs-12" ><span class="friendRequestText subheader">Friend Requests</span>
					<ul class = "list-group">
					<div v-if="showRequestSection">
						<div v-for = "request in friendRequests" class="col-md-4 col-lg-4 col-sm-4 col-xs-12 otherUserComment" >
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img src="https://lh3.googleusercontent.com/-hU5QCbUp_lU/AAAAAAAAAAI/AAAAAAAAAb8/-XvzN_1BBVU/photo.jpg" alt="Card image cap" class="img-responsive">
							</div>
							<div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{request.displayName}}</h5>
							    <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{request.email}}</p>
								<button type="button" class="btn btn-sm primary-btn interactive-text">Accept</button>
								<button type="button" class="btn btn-sm btn-default interactive-text">Reject</button>
							</div>
						</div>
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
				this.showRequestSection = true
				this.friendRequests.push(snapshot.val())
			}.bind(this))
		}
	},
	created : function(){
		this.$route.params.id
		firebase.database().ref('friendRequests/'+this.$route.params.id).on('child_added',function(snapshot){
			this.fetchUsersInfo(snapshot.val().from);
			}.bind(this))
	}
}
)