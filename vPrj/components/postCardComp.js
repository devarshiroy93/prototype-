Vue.component('post-card',{
	props :['post','userUid'],
	template : `<div>
				<!-- Card Starts-->
				<div v-if='post' >
				<div class="dashboard-card-block col-md-12 col-sm-12 col-xs-12 col-lg-12"  >
				<div class="postSetting" title="Edit Post">
					<i class="material-icons">more_vert</i>
					<div class="postSettingOptions">
						<ul>
							<li>Edit</li>
							<li>Delete</li>
						</ul>	
					</div>
				</div>
                     <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 dashboard-card-img">
                        <img :src="post.authorPic" alt="Card image cap" class="img-responsive">
                     </div>
                         <div class="col-md-10 col-sm-10 col-xs-10 col-lg-10 commentBody">
						 <div class="col-md-12 col-sm-12 col-xs-12 cardUserName"><span class="subheader userName dashboard-card-title">{{post.authorName}}</span><span></span><span class="post-time caption">{{post.timeStamp}}</span></div>
                            <p class="dashboard-card-text col-md-12 col-sm-12 col-xs-12 body1">{{post.body}}<span v-if="determineIfReadMoreNeeded()">...<readmore-comp v-on:redirect="goToIndividualPage($event)":postData = post ></readmore-comp></span></p>
                           <div class="row caption col-md-12 col-sm-12 col-xs-12 likeSection">
                            <like-comp :textId = "post.key" :currentUserId = "userUid" v-on:like-success = "increaseLikeCountOfPost($event)" v-on:show-likes = "showLikes($event)"></like-comp>
                            <a  class="col-md-3 col-xs-4 col-sm-4 col-lg-3 comments" v-on:click=goToIndividualPage(post)><i class="material-icons">chat_bubble_outline</i><span v-if="post.commentCount>0" class="commentCount"><strong>{{post.commentCount}} </strong></span>Comment<span v-if ="post.commentCount>1">s</span></a>
                            <a  class="col-md-3 col-xs-4 col-sm-4 col-lg-3"><i class="material-icons">share</i>Share</a></div>
                           </div>

                        </div>
                        <!-- Card Ends-->
						</div>
				
				</div>`,
		data : function(){
			return {
				isChopped : this.determineIfReadMoreNeeded()
				   }; 
		},
		methods:{
			goToIndividualPage : function(post){
				post.currentUser = this.userUid;
                router.push({ name: 'singularpage', params: {postData: post}});
            },
			determineIfReadMoreNeeded : function(){
				if(this.post.isChopped && this.$route.path == "/dashboard"){
					return true
				}
			},
			showLikes : function(data){
				this.$emit('show-likes',data)
			}
		},
		created :function(){ 
			this.isChopped = this.determineIfReadMoreNeeded()
		}
		

                     
})
