Vue.component('comment-list', {
    props: ['postKey'],
    template: `<div>
					<div v-for = 'com in commentList'>
					<div v-if ='!showComments'><loader-comp  state = 'loading' size='small'></loader-comp></div>
					<div v-if ='showComments'>
						<div class = "col-md-10 col-sm-10 col-xs-11 col-lg-10 otherUserComment">
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage">
								 <img :src="com.authorPic" alt="Card image cap" class="img-responsive">
							</div>
							<div class="col-md-10 col-sm-10 col-xs-10 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{com.authorName}}<span class="post-time caption">{{com.timeStamp}}</span></h5>
								<p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{com.body}}</p>
								<div class="row caption col-md-12 col-sm-12 col-xs-12 likeSection">
									<a class="col-md-3 col-xs-6 col-sm-3 col-lg-3"><i class="material-icons">thumb_up</i>Likes</a>
									<a class="col-md-3 col-xs-6 col-sm-3 col-lg-3 comments"><i class="material-icons">reply</i>Reply</a>
								</div>
						</div>		
							</div>
						</div>
					</div>
				</div>`,
    data: function () {
        return {
            commentList: [],
            comments: [],
            authors: [],
            showComments: false
        }
    },
    methods: {
        mergeAuthorsAndComments: function (comments, authors) {
            for (var i = 0; i < comments.length; i++) {
                for (var x = 0; x < authors.length; x++) {
                    if (comments[i].author === authors[x].uid) {
                        comments[i].authorName = authors[x].displayName;
                        comments[i].authorPic = authors[x].photoURL
                        comments[i].timeStamp = convertToReadableDate(comments[i].timeStamp)
                    }
                }
            }
            console.log(comments);
            this.commentList = comments;
            this.showComments = true;
            store.commit('assignCommentList', this.commentList);
            store.commit('assignCurrentPostKey', this.postKey);
        }
    },
    created: function () {
        var users = firebase.database().ref().child('users')
        var commentRef = firebase.database().ref().child('comments/' + this.postKey);
        console.log(this.postKey);
        if (this.postKey !== store.getters.getCurrentPostKey) {
            users = firebase.database().ref().child('users')
            commentRef = firebase.database().ref().child('comments/' + this.postKey);
            commentRef.on('child_added', function (snap) {
                console.log(snap.val());
                this.commentList.push(snap.val());
                users.child(snap.val().author).once('value', function (author) {
                    this.authors.push(author.val());
                    this.commentList.length === this.authors.length ? this.mergeAuthorsAndComments(this.commentList, this.authors) : '';
                    console.log(author.val());
                }.bind(this))
            }.bind(this))
        } else {
            this.commentList = store.getters.getCommentlistofPost;
            this.showComments = true;
        }



    }
})
