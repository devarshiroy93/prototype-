Vue.component('comment-list', {
    props: ['comments'],
    template: `<div>
					<div>
						<div class = "col-md-10 col-sm-10 col-xs-11 col-lg-10 otherUserComment">
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage">
								<img src="https://lh3.googleusercontent.com/-hU5QCbUp_lU/AAAAAAAAAAI/AAAAAAAAAb8/-XvzN_1BBVU/photo.jpg" alt="Comment Image" class="img-responsive">
							</div>
							<div class="col-md-8 col-sm-8 col-xs-10 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">Devarshi Roy<span class="post-time caption">25 Aug 2017 14:32</span></h5>
								<p class="commentText col-md-12 col-sm-12 col-xs-12 body3">Test post for comment testing</p>
								<div class="row caption col-md-12 col-sm-12 col-xs-12">
									<a class="col-md-4 col-xs-6 col-sm-4 col-lg-4"><i class="material-icons">thumb_up</i>Likes</a>
									<a class="col-md-4 col-xs-6 col-sm-4 col-lg-4 comments"><i class="material-icons">reply</i>Reply</a>
								</div>
							</div>
						</div>
					</div>
				</div>`,
    methods : {
        getAuthorsfromComments : function(commentObj){
            return commentObj.author
        }
    },
    created : function(){
        var commentAuthor ;
        var idsArr = Object.keys(this.comments);
        for(var i = 0 ;i<idsArr.length; i++){
            commentAuthor = getAuthorsfromComments(this.comments[idsArr[i]]);
            firebase.database().ref('users'+commentAuthor ).once('value',function(snap){
                snap.val();
            })
        }
    }
})