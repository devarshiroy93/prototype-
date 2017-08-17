Vue.component('post-card',{
	props :['userUid'],
	template : `<div>
				<!-- Card Starts-->
				<div v-if='postData' >
				
				<div class="dashboard-card-block col-md-12 col-sm-12 col-xs-12" v-for='post in postData'>
                     <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 dashboard-card-img">
                        <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" alt="Card image cap" class="img-responsive">
                     </div>
                         <div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
                             <h4 class="dashboard-card-title col-md-12 col-sm-12 col-xs-12 subheader">{{post.title}}<span class="post-time caption">{{post.timeStamp}}</span></h4>
                            <p class="dashboard-card-text col-md-12 col-sm-12 col-xs-12 body1">{{post.body}}</p>
                           <div class="row caption">
                            <a href="#" class="col-md-4 col-xs-4 col-sm-4 col-lg-4"><i class="material-icons">thumb_up</i>Likes</a>
                            <a href="#" class="col-md-4 col-xs-4 col-sm-4 col-lg-4"><i class="material-icons">chat_bubble_outline</i>Comments</a>
                            <a href="#" class="col-md-4 col-xs-4 col-sm-4 col-lg-4"><i class="material-icons">share</i>Share</a></div>
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
			reverseArray : function(){
				this.postData.reverse();
			}
		},
		created :function(){ 
		    
			debugger
			firebase.database().ref('posts/').on('value', function(snapshot) {
			//console.log(snapshot.val());
			this.postData = snapshot.val()
			this.reverseArray()
			console.log(this.postData)
			}.bind(this));
			
		}
                     
})