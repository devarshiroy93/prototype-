var friendListComp = Vue.component('friend-list',{
'props' : ['userUid'],
'template' : `<div>
				<div class="col-md-2"></div>
				<div class="col-md-8 col-sm-12 col-xs-12" >
				<loader-comp :state="showRequestSection?'':'loading'" size="small"></loader-comp>
				<span class="friendRequestText subheader">Friend Requests</span>
					<ul class = "list-group">
					<div v-if="showRequestSection">
<<<<<<< HEAD
						<div v-for = "request in friendRequests" class="col-md-6 col-lg-6 col-sm-6 col-xs-12 otherUserComment" >
=======
					 <div class="row">
						<div v-for = "request in friendRequests" class="col-md-4 col-lg-4 col-sm-4 col-xs-12 otherUserComment" >
>>>>>>> 0d3181a9b1b0000de82f615b69ad46c80c00e852
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img :src="request.photoURL" alt="Card image cap" class="img-responsive">
							</div>
							<div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{request.displayName}}</h5>
							    <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{request.email}}</p>
								<button type="button" class="btn btn-sm primary-btn interactive-text" v-on:click = acceptRequest(request.uid)>Accept</button>
								<button type="button" class="btn btn-sm btn-default interactive-text" v-on:deleteRequest(request.uid)>Reject</button>
							</div>	
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
		},
		acceptRequest : function(uid){
			var promise = addFriend(uid,this.$route.params.id);
			promise.then(function(result){
				if(result.database){
					alert('friend added')
				}		
			})
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