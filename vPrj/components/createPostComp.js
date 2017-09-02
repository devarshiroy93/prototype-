Vue.component('create-post',{
	props : ['userinfo'],
	template  :`<div>
					<div v-if  = '!createdClicked'><button type="button" class="btn btn-xs primary-btn subheader create-btn inEffect"   v-on:click = createClick()><i class="material-icons">add_circle_outline</i>Create</button></div>
					<div v-if  = 'createdClicked' class="createPost">
						<div class="form-group body2">
							<label for="PostBody"></label>
							<textarea class="form-control PostBody scrollbar-customised" rows="3" id="PostBody" v-model ="bodyContent" placeholder="What's cooking in your mind?"></textarea>
						</div>
					<button type="button" class="btn btn-sm primary-btn interactive-text" v-on:click = createPost()>Post</button>
					<button type="button" class="btn btn-sm btn-default interactive-text" v-on:click = cancelPost()>Cancel</button>
					</div>
				</div>`,
	data: function () {
			return {
				bodyContent : '',
				createdClicked : false
			}
		},
	methods : {
		createClick : function(){
			this.createdClicked = true;
		},
		cancelPost : function(){
			this.createdClicked = false;
		},
		createPost: function(){
			var promise = pushPostIntoDatabase(this.bodyContent,this.userinfo.providerData[0],this.userinfo.providerData[0].photoURL);
			promise.then(function(result){
				result.database ? alert('posted') : alert('not posted')
			}.bind(this))
			this.bodyContent = '';
		}
	}
})
