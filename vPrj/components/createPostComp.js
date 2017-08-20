Vue.component('create-post',{
	props : ['userinfo'],
	template  :`<div>
					<div><button type="button" class="btn btn-xs btn-success subheader create-btn"   v-on:click = createClick()><i class="material-icons">add_circle_outline</i>Create</button></div>
					<div v-if  = 'createdClicked' class="createPost">
						<div class="form-group body2">
							<label for="title"></label>
							<input type="text" class="form-control input-sm" id="title" v-model ="titleContent"  placeholder="Title of Post...">
							<label for="PostBody"></label>
							<textarea class="form-control PostBody" rows="3" id="PostBody" v-model ="bodyContent" placeholder="Body of Post..."></textarea>
						</div>
					<button type="button" class="btn btn-sm btn-success interactive-text" v-on:click = createPost()>Post</button>
					<button type="button" class="btn btn-sm btn-default interactive-text" v-on:click = cancelPost()>Cancel</button>
					</div>
				</div>`,
	data: function () {
			return {
				titleContent : '',
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
			debugger
			pustPostIntoDatabase(this.titleContent,this.bodyContent,this.userinfo.uid,this.userinfo.providerData[0].photoURL);
			this.titleContent = '',this.bodyContent = '';
		}
	}
})
