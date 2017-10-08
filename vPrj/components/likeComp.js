Vue.component('like-comp',{
	'props' : ['textId','currentUserId'],
	'template' : `<div><span class="col-md-3 col-xs-4 col-sm-4 col-lg-3"><i class="material-icons" v-on:click="likeUnlikeActivity">thumb_up</i> <a>{{likeCount}} Likes</a></span></div>`,
	data : function(){
		return {
			likeCount : this.getNumberOfLikes(),
			likeAllowed : true
		}
	},
	'methods' :{
		getNumberOfLikes : function(){
			firebase.database().ref('likes/likesCount').child(this.textId).on('child_added',function(snapshot){
				console.log('likecount,'+snapshot.val())
				this.likeCount = snapshot.exportVal()

			}.bind(this))
		},
		pushLikes : function(){
			if(this.likeAllowed){
				pushLikesIntoDataBase(this.textId,this.currentUserId).then(function(result){
				if(result.database){
					this.increaseLikeCountOfPost({'textId':this.textId,'userId' :this.currentUserId})
				}
			}.bind(this))
			}
			
		},
		setLikeAllowed : function(pushkeys,likeData){
			for(var i = 0 ; i<pushkeys.length; i++){
					if(likeData[pushkeys[i]].likedBy === this.currentUserId){
						this.likeAllowed = false
					}
				}
		},
		likeUnlikeActivity : function(){
			var pushKeys = [];
			firebase.database().ref('likes/').child(this.textId).once('value').then(function(snap){
				if(snap.val() !== null){
					pushKeys = Object.keys(snap.val());
					this.setLikeAllowed(pushKeys,snap.val());
				}
				this.pushLikes();
			}.bind(this))
		},
		increaseLikeCountOfPost : function(likeSpecificData){
				var countPromise = transactionServiceFunction('likes',likeSpecificData.textId,'like');
				countPromise.then(function (response) {
				this.likeCount = response.snapshot.exportVal()
            }.bind(this))
			}
	} ,
});