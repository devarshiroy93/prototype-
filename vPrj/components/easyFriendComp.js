//Component to send contact request from posts
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
		firebase.database().ref('friendRequests/'+this.postAuthor).on('child_added',function(snapshot){
			console.log(snapshot.val());
			if(snapshot.val().from === this.userId){
				this.friendButtonDisable = false
			}else{
				this.friendButtonDisable = true;
			}
			firebase.database().ref('friendRequests/'+this.postAuthor).off()
		}.bind(this))
	}
})