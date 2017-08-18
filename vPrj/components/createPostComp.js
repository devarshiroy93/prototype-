Vue.component('create-post',{
	props : ['userUid'],
	template  :`<div>
					<div>
					<button type="button" class="btn btn-sm btn-success subheader create-btn"><i class="material-icons">add_circle_outline</i>CREATE</button>
					<div class="form-group post-form">
						<label for="title">Title</label>
						<input type="text" class="form-control input-sm" id="title" v-model ="titleContent">
						<label for="PostBody"></label>
						<textarea class="form-control" rows="3" id="PostBody" v-model ="bodyContent"></textarea>
					</div>
					<button type="button" class="btn btn-default" v-on:click = createPost()>Post</button>
					</div>
				</div>`,
	data: function () {
			return {
				titleContent : '',
				bodyContent : ''	
			}
		},
	methods : {
		createPost: function(){
			debugger
			pustPostIntoDatabase(this.titleContent,this.bodyContent,this.userUid);
			this.titleContent = '',this.bodyContent = '';
		}
	}
})
