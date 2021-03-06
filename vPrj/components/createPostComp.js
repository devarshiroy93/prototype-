Vue.component('create-post', {
    props: ['userinfo'],
    template: `<div>
					<div v-if  = '!createdClicked'><button type="button" class="btn btn-xs primary-btn subheader create-btn inEffect"   v-on:click = createClick()><i class="material-icons">mode_edit</i><span v-if="!currentView">Create</span></button></div>
					<div v-if  = 'createdClicked' class="createPost">
						<div class="form-group body3">
							<label for="PostBody"></label>
							<textarea class="form-control PostBody scrollbar-customised" rows="3" id="PostBody" v-model ="bodyContent" placeholder="What's cooking in your mind?"></textarea>
						</div>
					<button type="button" class="btn btn-sm primary-btn interactive-text" v-on:click = createPost()>Post</button>
					<button type="button" class="btn btn-sm btn-default interactive-text" v-on:click = cancelPost()>Cancel</button>
					</div>
				</div>`,
    data: function () {
        return {
            bodyContent: '',
            createdClicked: false,
			remainingContent :'',
            currentView : store.getters.getCurrentView
        }
    },
    methods: {
        createClick: function () {
            this.createdClicked = true;
            window.scrollTo(0,0);
        },
        cancelPost: function () {
            this.createdClicked = false;
        },
        createPost: function () {
            var promise
            var choppedContent;
            var internalPromise;
            var isChopped
            isChopped = false;
            if (this.bodyContent.length > 250) {
                choppedContent = this.bodyContent.slice(0, 250);
                this.remContent = this.bodyContent.slice(250, this.bodyContent.length);
                isChopped = true
              
            } else {
                choppedContent = this.bodyContent
            }
            promise = pushPostIntoDatabase(choppedContent, isChopped, this.userinfo, this.userinfo.providerData[0].photoURL);
			if(this.remContent !== "" && this.remContent !== undefined ){
				promise.then(function (result) {
                result.database ? pushLongTextBodyintoDatabase(this.remContent, result.key) : '';
                result.database ? alert('posted') : alert('error');
            }.bind(this))
			}
            
            this.bodyContent = '';
        }
    }
})
