Vue.component('message-list',{
    'props':  ['friendList'],
    'template' :`<div>
                    <div class="col-md-4 col-lg-3 col-sm-4 hidden-xs col-xs-12 friendRequestPanel messageList scrollbar-customised"><div><span class="messageHeader subheader">Messages</span><span class="material-icons messageSearch" title="Search" v-on:click="">search</span></div>
                        <hr class="divider">
                        <div class="md-12 col-lg-12 col-sm-12 col-xs-12 searchMessage"><input type="text" class="body2" placeholder="Search messages"/></div>
                        <ul class="list-group">
                            <div>
                                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 individualMessage">
                                    <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img src="https://lh3.googleusercontent.com/-hU5QCbUp_lU/AAAAAAAAAAI/AAAAAAAAAb8/-XvzN_1BBVU/photo.jpg" alt="Card image cap" class="img-responsive"></div> <div class="col-md-10 col-sm-8 col-xs-10 col-lg-10"><h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">Devarshi Roy</h5> <p class="commentText messageContent col-md-12 col-sm-12 col-xs-12 body2">Hey Chandan! How r u doing?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div><div class="newMessageCount">2</div>
                                </div>
                            </div>
                            <div>
                            <button class="btn btn-primary createMsgBtn"><i class="material-icons">message</i></button>
                            </div>
                        </ul>
                    </div>
				
			</div>`
})