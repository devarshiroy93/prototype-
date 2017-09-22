Vue.component('post-card',{
	props :['userUid'],
	template : `<div>
				<!-- Card Starts-->
				<div v-if='postData' >
				<div class="dashboard-card-block col-md-12 col-sm-12 col-xs-12 col-lg-12" v-for='post in postData' >
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
						 <div class="col-md-12 col-sm-12 col-xs-12 cardUserName"><span class="subheader userName dashboard-card-title">{{post.authorName}}</span><span><easy-friend :userId = userUid :postAuthor = post.createdby v-on:add-friend="addFriend($event)"></easy-friend></span><span class="post-time caption">{{post.timeStamp}}</span></div>
                            <p class="dashboard-card-text col-md-12 col-sm-12 col-xs-12 body1">{{post.body}}<span v-if="post.isChopped">...<readmore-comp v-on:redirect="goToIndividualPage($event)":postData = post ></readmore-comp></span></p>
                           <div class="row caption col-md-12 col-sm-12 col-xs-12 likeSection">
                            <a  class="col-md-3 col-xs-4 col-sm-4 col-lg-3"><i class="material-icons">thumb_up</i>Likes</a>
                            <a  class="col-md-3 col-xs-4 col-sm-4 col-lg-3 comments" v-on:click=goToIndividualPage(post)><i class="material-icons">chat_bubble_outline</i><span v-if="post.commentCount>0" class="commentCount"><strong>{{post.commentCount}} </strong></span>Comment<span v-if ="post.commentCount>1">s</span></a>
                            <a  class="col-md-3 col-xs-4 col-sm-4 col-lg-3"><i class="material-icons">share</i>Share</a></div>
                           </div>

                        </div>
                        <!-- Card Ends-->
						</div>
				
				</div>`,
		data : function(){
			return {
					postData : [],
					friendList :[]
				   }; 
		},
		methods:{
			goToIndividualPage : function(post){
				post.currentUser = this.userUid;
                router.push({ name: 'singularpage', params: {postData: post}});
            },
            addFriend : function($event){
            	this.$emit('add-friend',$event);
            }
		},
		created :function(){ 
		var readableDate = '';
		var formattedObj ={} ;
		//adding handle to own posts
			firebase.database().ref('posts/'+this.userUid).on('child_added',function(snapshot){
				formattedObj = snapshot.val()
				formattedObj.key = snapshot.key;
				readableDate = processTimeStamp(formattedObj.timeStamp);
				formattedObj.timeStamp = readableDate
				this.postData.push(formattedObj);
				this.postData = this.postData.reverse();
			}.bind(this))
		//adding handle to own posts end

		//this.$emit('postcard-created');	// to incidate to parent that child component has been created

		firebase.database().ref('friends/').child(this.userUid).once('value').then(function(snapshot){
			var localDatakeys = Object.keys(snapshot.val());
			for(var  i= 0;i<localDatakeys.length;i++){
				this.friendList.push(snapshot.val()[localDatakeys[i]]);
			}
			if(localDatakeys.length === this.friendList.length){
				for(var x =0 ;x<this.friendList.length;x++){
					firebase.database().ref('posts/').child(this.friendList[x].friendId).on('child_added',function(snap){
						this.postData.push(snap.val())
					}.bind(this))
				}
			}
		}.bind(this))
	}
		

                     
})
