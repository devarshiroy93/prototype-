Vue.component('user-cards',{
props : ['userItems'],
template : `<div>
				<div v-for = "friend in userItems" class="col-md-12 col-lg-12 col-sm-12 col-xs-12 otherUserComment friendRequest">
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img :src="friend.photoURL" alt="Card image cap" class="img-responsive">
							</div>
							<div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{friend.displayName}}</h5>
							    <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{friend.email}}</p>
							</div>
						</div>
			</div>`,
data: function () {
        return {
			
        }
    },
})