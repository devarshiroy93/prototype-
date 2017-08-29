Vue.component('comment-list', {
	props : ['postKey'],
    template: `<div>
					<div v-for = 'com in commentList'>
						<div class = "col-md-10 col-sm-10 col-xs-11 col-lg-10 otherUserComment">
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage">
								
							</div>
							<div class="col-md-8 col-sm-8 col-xs-10 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{com.author}}<span class="post-time caption">{{com.timeStamp}}</span></h5>
								<p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{com.body}}</p>
								<div class="row caption col-md-12 col-sm-12 col-xs-12 likeSection">
									<a class="col-md-4 col-xs-6 col-sm-4 col-lg-4"><i class="material-icons">thumb_up</i>Likes</a>
									<a class="col-md-4 col-xs-6 col-sm-4 col-lg-4 comments"><i class="material-icons">reply</i>Reply</a>
								</div>
							</div>
						</div>
					</div>
				</div>`,
	data : function(){
		return {
			commentList : [],
			comments : [],
			authors : []
		}
	},
    methods : {
       mergeAuthorsAndComments : function(comments,authors){
		   for(var i=0;i<comments.length;i++ ){
			   for(var x=0;x<authors.length;x++ ){
			   if(comments[i].author === authors[x].uid){
				   comments[i].author = authors[x].displayName;
			   }
			}
		   }
		   console.log(comments);
           this.commentList = comments;
	   }
    },
    created : function(){
        console.log(this.postKey);
		var users = firebase.database().ref().child('users')
		var commentRef = firebase.database().ref().child('comments/'+this.postKey);
		commentRef.on('child_added',function(snap){
			console.log(snap.val());
			this.commentList.push(snap.val());
			users.child(snap.val().author).once('value',function(author){
				this.authors.push(author.val());
				this.commentList.length === this.authors.length ? this.mergeAuthorsAndComments(this.commentList,this.authors) :'';
				console.log(author.val());
			}.bind(this))
		}.bind(this))
        
    }
})
