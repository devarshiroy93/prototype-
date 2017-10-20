var friendListComp = Vue.component('friend-list',{
'template' : `	<div>
					<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 friendListComp">
						<div class="col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6 col-sm-offset-3 col-sm-6 col-xs-12 friendRequestPanel" v-if ="showRequestSection"><span class="friendRequestText subheader">Friend Requests</span>
						<hr class="divider">
							<ul class = "list-group">
							<div v-if="showRequestSection">
								<div v-for = "request in friendRequests" class="col-md-12 col-lg-12 col-sm-12 col-xs-12 otherUserComment friendRequest" >
									<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img :src="request.photoURL" alt="Card image cap" class="img-responsive">
									</div>
									<div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
										<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{request.displayName}}</h5>
									    <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{request.email}}</p>
										<button type="button" class="btn btn-xs primary-btn interactive-text" v-on:click=acceptRequest(request.uid,request.key,request)>Accept</button>
										<button type="button" class="btn btn-xs btn-default interactive-text">Reject</button></div>
									</div>
								</div>
						</ul>
						</div>
						<div class="col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6 col-sm-offset-3 col-sm-6 col-xs-12 friendsPanel" v-if ="showFriendsSection"><span class="friendRequestText subheader">Friends</span>
						<hr class="divider">
							<ul class = "list-group">
							<div v-if="showFriendsSection">
								<div v-for="user in friends">
										<div><user-cards :friend = "user"></user-Cards></div>
									</div>
							</div>
						</ul>
						</div>
					</div>
				</div>`,
 data: function () {
        return {
			showRequestSection : false,
			friendRequests : [],
			showFriendsSection : false,
			friends : []
        }
    },
	methods : {
		fetchUsersInfo : function(from,key,purpose){
			var friendLister = {};
			firebase.database().ref('users').child(from).once('value').then(function(snapshot){
				
				friendLister = snapshot.val();
				friendLister.key = key;
				if(purpose === "friendRequests")
					{ this.friendRequests.push(friendLister) ; 
					  this.showRequestSection = true}
				else{ 
					this.friends.push(friendLister);
					this.showFriendsSection = true;
				}
				
			}.bind(this))
		},
		acceptRequest : function(uid,key,obj){
			var promise = addFriend(uid,this.$route.params.id);
			promise.then(function(result){
				if(result.database){
					addFriend(this.$route.params.id,uid).then(function(result){
						if(result.database){
							this.removeFriendRequest(key,obj);
							this.decreaseFriendRequestCount(this.userUid);
							pushNotificationsforUser(uid,obj.displayName)
						}
					}.bind(this))	
				}		
			}.bind(this))
			
		},
		removeFriendRequest : function(key,obj){
			var tableName = this.$route.params.id;
			var ref = key ;
			deletefromDatabase(tableName,ref);
			this.friendRequests.splice(this.friendRequests.indexOf(obj),1);
		},
		decreaseFriendRequestCount : function(id){
			negativeTransactionForLikeCount(id)
		}
	},
	created : function(){
		this.userUid = this.$route.params.id ;
		this.$route.params.id
		firebase.database().ref('friendRequests/'+this.$route.params.id).on('child_added',function(snapshot){
			snapshot.val() !== null ? this.showRequestSection = true :  this.showRequestSection = false 
			this.fetchUsersInfo(snapshot.val().from,snapshot.key,"friendRequests");
			}.bind(this))
			
		firebase.database().ref('friends/'+this.$route.params.id).on('child_added',function(snapshot){
			this.fetchUsersInfo(snapshot.val().friendId,snapshot.key,"friends");
			}.bind(this))
	}
}
)
