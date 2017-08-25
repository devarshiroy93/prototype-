var individualPostcomp = Vue.component('singular-page',{
    props:['data'],
    template :`<div>
                    <div class= "col-md-2"></div>
                    <div class="col-md-8 col-sm-12 col-xs-12">                                
                    <div>
				<!-- Card Starts-->
				<div  >
				
				<div class="dashboard-card-block col-md-12 col-sm-12 col-xs-12" >
                     <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 dashboard-card-img">
                        <img :src=data.authorPic alt="Card image cap" class="img-responsive">
                        </div>
                         <div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
                             <h4 class="dashboard-card-title col-md-12 col-sm-12 col-xs-12 subheader">{{data.authorName}}<span class="post-time caption">{{data.timeStamp}}</span></h4>
                            <p class="dashboard-card-text col-md-12 col-sm-12 col-xs-12 body1">{{data.body}}</p>
                           <div class="row caption">
                            <a  class="col-md-4 col-xs-4 col-sm-4 col-lg-4"><i class="material-icons">thumb_up</i>Likes</a>
                            <a class="col-md-4 col-xs-4 col-sm-4 col-lg-4 comments"><i class="material-icons">chat_bubble_outline</i>Comments</a>
                            <a  class="col-md-4 col-xs-4 col-sm-4 col-lg-4"><i class="material-icons">share</i>Share</a></div>
                         </div>
                     </div>
				 
                        <!-- Card Ends-->
				</div>
				<comment-comp v-on:do-comment ="postComment($event)" :data = data ></comment-comp>
				
				    </div>
                </div><div class="col-md-2"></div>
                </div>`,
	methods : {
		postComment : function(commentData){
			var filteredCommentData = {
			body : commentData.commentbody,
			author : commentData.currentUser,
			timeStamp : Date.now(),
			
			};
			var promise = pushCommentsIntoDataBase(filteredCommentData,commentData.key)
			promise.then(function(result){
				result ? alert('comment posted') : alert('comment not posted');
			});
		}
	}
})
