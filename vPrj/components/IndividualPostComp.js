var individualPostcomp = Vue.component('singular-page', {
    props: ['postData'],
    template: `<div>
                    <div class= "col-md-2"></div>
                    <div class="col-md-8 col-sm-12 col-xs-12">                                
                    <div>
				<!-- Card Starts-->
				<div  >
				
				<div class="dashboard-card-block col-md-12 col-sm-12 col-xs-12" >
                     <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 dashboard-card-img">
                        <img :src=postData.authorPic alt="Card image cap" class="img-responsive">
                        </div>
                         <div class="col-md-10 col-sm-10 col-xs-10 col-lg-10 commentBody">
                             <h4 class="dashboard-card-title col-md-12 col-sm-12 col-xs-12 subheader">{{postData.authorName}}<span class="post-time caption">{{postData.timeStamp}}</span></h4>
                            <p class="dashboard-card-text col-md-12 col-sm-12 col-xs-12 body1">{{postData.body}}</p>
                           <div class="row caption col-md-12 col-sm-12 col-xs-12 likeSection">
                            <a  class="col-md-3 col-xs-4 col-sm-3 col-lg-3"><i class="material-icons">thumb_up</i>Likes</a>
                            <a class="col-md-3 col-xs-4 col-sm-3 col-lg-3 comments"><i class="material-icons">chat_bubble_outline</i><span v-if="postData.commentCount>0" class="commentCount"><strong>{{postData.commentCount}} </strong></span>Comment<span v-if ="postData.commentCount>1">s</span></a>
                            <a  class="col-md-3 col-xs-4 col-sm-3 col-lg-3  "><i class="material-icons">share</i>Share</a></div>
                         </div>
                     </div>
				 
                        <!-- Card Ends-->
				</div>
                <comment-list :postKey = postData.key></comment-list>
				<comment-comp v-on:do-comment ="postComment($event)" :data = postData ></comment-comp>
				
				    </div>
                </div><div class="col-md-2"></div>
                </div>`,
    data: function () {
        return {
            comments: {}

        }

    },
    methods: {
        postComment: function (commentData) {
            var filteredCommentData = {
                body: commentData.commentbody,
                author: commentData.currentUser,
                timeStamp: Date.now(),

            };
            var promise = pushCommentsIntoDataBase(filteredCommentData, commentData.key)
            promise.then(function (result) {
                //result ? alert('comment posted') : alert('comment not posted');
            });
            var countPromise = commentCountTransaction(commentData.key);
            countPromise.then(function (response) {
                console.log(response)
                this.postData.commentCount = response.snapshot.exportVal()
            }.bind(this))
        }

    },
    created: function () {
        if (this.postData.isChopped) {
            firebase.database().ref('longPostTexts/' + this.postData.key).once('value').then(function (response) {
                this.postData.body += response.val().body;
            }.bind(this))
        }
    }

})
