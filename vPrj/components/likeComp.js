Vue.component('like-comp',{
	'props' : ['textId','currentUserId'],
	'template' : `<div><span class="col-md-3 col-xs-4 col-sm-4 col-lg-3"><i class="material-icons" v-on:click="likeUnlikeActivity">thumb_up</i> <a>{{likeCount}} Likes</a></span></div>`,
	data : function(){
		return {
			likeCount : this.getNumberOfLikes()
		}
	},
	'methods' :{
		getNumberOfLikes : function(){
			console.log('called')
		},
		likeUnlikeActivity : function(){
			pushLikesIntoDataBase(this.textId,this.currentUserId).then(function(result){
				if(result.database){
					this.increaseLikeCountOfPost({'textId':this.textId,'userId' :this.currentUserId})
				}
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