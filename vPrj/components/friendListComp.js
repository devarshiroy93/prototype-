var friendListComp = Vue.component('friend-list',{
'props' : ['userUid'],
'template' : `<div>
				<div class="col-md-5 col-lg-5 col-sm-6 col-xs-12 friendRequestPanel"><span class="friendRequestText subheader">Friend Requests</span>
					<ul class = "list-group">
					<div v-if="showRequestSection">
						<div v-for = "request in friendRequests" class="col-md-8 col-lg-8 col-sm-12 col-xs-12 otherUserComment friendRequest" >
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img :src="request.photoURL" alt="Card image cap" class="img-responsive">
							</div>
							<div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{request.displayName}}</h5>
							    <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{request.email}}</p>
								<button type="button" class="btn btn-xs primary-btn interactive-text" v-on:click=acceptRequest(request.uid,request.key)>Accept</button>
								<button type="button" class="btn btn-xs btn-default interactive-text">Reject</button></div>
							</div>
						</div>
				</ul>
				</div>
				<div class="col-md-6 col-lg-5 col-sm-6 col-xs-12 friendsPanel" ><span class="friendRequestText subheader">Friend</span>
					<ul class = "list-group">
					<div v-if="showRequestSection">
						<div v-for = "request in friendRequests" class="col-md-8 col-lg-8 col-sm-12 col-xs-12 otherUserComment friendRequest" >
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img :src="request.photoURL" alt="Card image cap" class="img-responsive">
							</div>
							<div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{request.displayName}}</h5>
							    <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{request.email}}</p>
							</div>
						</div>
				</ul>
				</div>
			</div>`,
 data: function () {
        return {
			showRequestSection : false,
			friendRequests : []
        }
    },
	methods : {
		fetchUsersInfo : function(from,key){
			var friendLister = {};
			firebase.database().ref('users').child(from).once('value').then(function(snapshot){
				this.showRequestSection = true;
				friendLister = snapshot.val();
				friendLister.key = key;
				this.friendRequests.push(friendLister)
			}.bind(this))
		},
		acceptRequest : function(uid,key){
			var promise = addFriend(uid,this.$route.params.id);
			promise.then(function(result){
				if(result.database){
					this.removeFriendRequest(key)
				}		
			}.bind(this))
		},
		removeFriendRequest : function(key){
			var tableName = this.$route.params.id;
			var ref = key ;
			deletefromDatabase(tableName,ref);
		}
	},
	created : function(){
		this.$route.params.id
		firebase.database().ref('friendRequests/'+this.$route.params.id).on('child_added',function(snapshot){
			this.fetchUsersInfo(snapshot.val().from,snapshot.key);
			}.bind(this))
	}
}
)