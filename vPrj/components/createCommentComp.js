Vue.component('comment-comp', {
    'props': ['data'],
    data: function () {
        return {
            commentText: ''
        }
    },
    'template': `<div>
						<div class="col-md-12 col-sm-12 col-xs-12 createComment">
							<label for="inputsm"></label>
							<textarea class="form-control input-sm body1" id="inputsm" type="text" placeholder="Enter your comment" v-model ="commentText"></textarea>
							<div class="commentButton"><button type="button" class="btn btn-sm primary-btn interactive-text" v-on:click =doComment(commentText)>Comment</button></div>
						</div>
				 </div>`,
    'methods': {
        doComment: function (commentText) {
            var commentData = {};
            commentData = this.data;
            commentData.commentbody = commentText;
            commentText === "" ? alert('blank comment not posted') : this.$emit('do-comment', commentData);
			this.commentText = '';
        }
    }

})
