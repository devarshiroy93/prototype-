var searchResults = Vue.component('searchresults-comp',{
	props : ['searchString'],
	template : `<div>
					<div class="col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 col-sm-offset-2 col-sm-10 col-xs-12">
						<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12 otherUserComment friendRequest">
							<p class="subheader">Results</p>
							<hr class="divider">
								<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage">
									<img src="https://lh3.googleusercontent.com/-hU5QCbUp_lU/AAAAAAAAAAI/AAAAAAAAAb8/-XvzN_1BBVU/photo.jpg" alt="Card image cap" class="img-responsive">
								</div>
								<div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
									<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">Devarshi Roy</h5>
									<p class="searchFriendRequest"><i class="material-icons" title="Send Friend Request">person_add</i></p>
									<p class="commentText col-md-12 col-sm-12 col-xs-12 body3">devarshiroy93@gmail.com</p>
								</div><br/>
						</div>
						<div class="col-md-8 col-lg-8 col-sm-8 col-xs-12 otherUserComment friendRequest">
							<div class = "col-lg-12 col-md-12 col-sm-12 recentSearchResult">
								<p class="subheader">Recent Searches</p>
								<hr class="divider">
								<p class="body2">There are no records found.</p>
							</div>
						</div>
					</div>
				</div>`,

	created : function(){

	}
})