var individualPostcomp = Vue.component('singular-page', {
    props: ['postData'],
    template: `<div><div>
                    <div class= "col-md-2"></div>
                    <div class="col-md-8 col-sm-12 col-xs-12">                                
                    <div>
				<!-- Card Starts-->
				 <post-card :post = "postDataTemp" v-on:show-likes = "showLikes($event)"></post-card>
                 <modal-comp :showModal = showCustModal v-on:close-modal = "closeModal" :modalContent = modalContent></modal-comp>
                <!-- Card Ends-->
				</div>
                <comment-list :postKey = postDataTemp.key></comment-list>
				<comment-comp v-on:do-comment ="postComment($event)" :data = postDataTemp ></comment-comp>
				
				    </div>
                </div><div class="col-md-2"></div>
                </div></div>`,
    data: function () {
        return {
            comments: {},
			postDataTemp : '',// this data property added for bug fixing as prop property coming as undefined in callback block 
            modalContent : null,
            showCustModal : false
        }

    },
    methods: {
        postComment: function (commentData) {
            var filteredCommentData = {
                body: commentData.commentbody,
                author: commentData.currentUser,
                timeStamp: Date.now(),

            };
            var promise = pushCommentsIntoDataBase(filteredCommentData, commentData.key)
            promise.then(function (result) {
                //result ? alert('comment posted') : alert('comment not posted');
            });
            var countPromise = transactionServiceFunction(commentData.createdby,commentData.key,'comment');
            countPromise.then(function (response) {
                console.log(response)
               this.postDataTemp.commentCount = response.snapshot.exportVal()
            }.bind(this))
        },
        showLikes : function(data){
            this.modalContent = data;
            this.showCustModal = true
        },
        closeModal : function(){
			this.showCustModal = false;
		}

    },
    created: function () {
        this.postDataTemp = this.postData
        if (this.postData.isChopped) {
            firebase.database().ref('longPostTexts/' + this.postDataTemp.key).on('child_added',function (response) {
                this.postDataTemp.body += response.val();
            }.bind(this))
        }
    }

})
