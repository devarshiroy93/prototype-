var dashboardComp = Vue.component('dash-comp',{
props : ['user'],
template : `<div>
                <div class ="col-md-3 col-sm-3 col-xs-12 sidebar-content"><sidebar-comp :userData = user.providerData[0]></sidebar-comp></div>
                <div class="col-md-7 col-sm-7 col-xs-12">
                    <div v-if="user.providerData[0] !== undefined" >
                    <!-- Card Starts-->
                     <div class="dashboard-card-block col-md-12 col-sm-12 col-xs-12">
                     <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 dashboard-card-img">
                        <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" alt="Card image cap" class="img-responsive">
                     </div>
                         <div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
                             <h4 class="dashboard-card-title col-md-12 col-sm-12 col-xs-12 subheader">Special title treatment<span class="post-time caption">10 mins ago</span></h4>
                            <p class="dashboard-card-text col-md-12 col-sm-12 col-xs-12 body1">With supporting text below as a natural lead-in to additional content.</p>
                           <div class="row caption">
                            <a href="#" class="col-md-4 col-xs-4 col-sm-4 col-lg-4"><i class="material-icons">thumb_up</i>Likes</a>
                            <a href="#" class="col-md-4 col-xs-4 col-sm-4 col-lg-4"><i class="material-icons">chat_bubble_outline</i>Comments</a>
                            <a href="#" class="col-md-4 col-xs-4 col-sm-4 col-lg-4"><i class="material-icons">share</i>Share</a></div>
                           </div>
                        </div>
                        <!-- Card Ends-->
				    </div>
                </div>
            </div>`,
										
methods :{
	
	gSignOut : function(){
		singingOutService(router);
	}
},
    created:function(){
        if(this.$route.params.user === undefined){
            router.push('login')
        }
        pushUserData(this.$route.params.user);//function pushes user data obtained from various service providers into database.Passwords are not available in database
    }
										
})
