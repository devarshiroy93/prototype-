Vue.component('comment-comp',{
	'props' :['data'],
	data: function () {
			return {
                commentText : ''
			}
		},
	'template' : `<div>
						<div>
							<label for="inputsm"></label>
							<input class="form-control input-sm" id="inputsm" type="text" v-model ="commentText"/>
							<div><button type="button" class="btn btn-default" v-on:click =doComment(commentText)>comment</button></div>
						</div>
				 </div>`,
	'methods' : {
		doComment : function(commentText){
			var commentData = {};
			commentData = this.data;
			commentData.commentbody = commentText;
			commentText === "" ? alert('blank comment not posted') : this.$emit('do-comment',commentData);       
		}
	}
				 
})