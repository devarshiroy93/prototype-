Vue.component('post-card',{
	props :['userUid'],
	template : `<div>
				<!-- Card Starts-->
				<div v-if='postData' >
				
				<div class="dashboard-card-block col-md-12 col-sm-12 col-xs-12 col-lg-12" v-for='post in postData'  v-on:click = goToIndividualPage(post)>
                     <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 dashboard-card-img">
                        <img :src="post.authorPic" alt="Card image cap" class="img-responsive">
                     </div>
                         <div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
						 <div class="col-md-12 col-sm-12 col-xs-12 cardUserName"><span class="subheader userName dashboard-card-title">{{post.authorName}}</span><span class="post-time caption">{{post.timeStamp}}</span></div>
                            <p class="dashboard-card-text col-md-12 col-sm-12 col-xs-12 body1">{{post.body}}</p>
                           <div class="row caption col-md-12 col-sm-12 col-xs-12 likeSection">
                            <a  class="col-md-3 col-xs-4 col-sm-4 col-lg-3"><i class="material-icons">thumb_up</i>Likes</a>
                            <a  class="col-md-3 col-xs-4 col-sm-4 col-lg-3 comments" v-on:click=goToIndividualPage(post)><i class="material-icons">chat_bubble_outline</i>Comments</a>
                            <a  class="col-md-3 col-xs-4 col-sm-4 col-lg-3"><i class="material-icons">share</i>Share</a></div>
                           </div>

                        </div>
                        <!-- Card Ends-->
						</div>
				
				</div>`,
		data : function(){
			return {
					postData : []
				   }; 
		},
		methods:{
			goToIndividualPage : function(post){
				post.currentUser = this.userUid;
                router.push({ name: 'singularpage', params: {postData: post}});
            }
		},
		created :function(){ 
		var readableDate = '';
		var formattedObj ={} ;
			firebase.database().ref('posts/').orderByChild('timeStamp').on('child_added',function(snapshot){
				formattedObj = snapshot.val()
				formattedObj.key = snapshot.key;
				readableDate = convertToReadableDate(formattedObj.timeStamp);
				formattedObj.timeStamp = readableDate
				this.postData.push(formattedObj);
				this.postData = this.postData.reverse();
			}.bind(this))
			
		}
                     
})
