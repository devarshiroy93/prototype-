//Component to send contact request from the component of which this component is a part of
Vue.component('easy-friend',{
	'props' : ['userId','postAuthor'],
	'template' : `<div class="addFriend"  v-if="userId!==postAuthor && friendButtonDisable"><button  v-on:click = "addFriend" title="Add as Friend"><i class="material-icons" >person_add</i></button></div>`,
	'methods' : {
		addFriend : function(){
			var details = {
				userId: this.userId,
				postAuthor: this.postAuthor
			}
			this.$emit('add-friend',details)
		}
	},
	data :function(){
		return{
			friendButtonDisable : true
		}
	},
	created: function(){
		this.userIdTemp = this.userId;
		this.postAuthorTemp = this.postAuthor;
		firebase.database().ref('friendRequests/'+this.postAuthorTemp).on('child_added',function(snapshot){
			console.log(snapshot.val());
			if(snapshot.val().from === this.userId){
				this.friendButtonDisable = false
			}
			firebase.database().ref('friendRequests/'+this.postAuthorTemp).off()
		}.bind(this))
		
		
			firebase.database().ref('friends/'+this.userIdTemp).on('child_added',function(snapshot){
			console.log(snapshot.val());
			if(snapshot.val().friendId === this.postAuthor){
				this.friendButtonDisable = false
			}
			firebase.database().ref('friends/'+this.userIdTemp).off()
			}.bind(this))
			
			firebase.database().ref('friendRequests/'+this.userIdTemp).on('child_added',function(snapshot){
				if(snapshot.val().from === this.postAuthor){
					this.friendButtonDisable = false
				}
				firebase.database().ref('friendRequests/'+this.userIdTemp).off()
			}.bind(this))
		
		
	}
})