Vue.component('message-list',{
    'props':  ['friendList'],
    'template' :`<div>
                    <div class="col-md-4 col-lg-3 col-sm-4 hidden-xs col-xs-12 friendRequestPanel messageList scrollbar-customised"><div><span class="messageHeader subheader">Messages</span></div>
                        <hr class="divider">
                        <div class="md-12 col-lg-12 col-sm-12 col-xs-12 searchMessage"><input type="text" class="body2" placeholder="Search messages"/></div>
                        <ul class="list-group">
                            <div>
                                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 individualMessage">
                                    <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img src="https://lh3.googleusercontent.com/-hU5QCbUp_lU/AAAAAAAAAAI/AAAAAAAAAb8/-XvzN_1BBVU/photo.jpg" alt="Card image cap" class="img-responsive"></div> <div class="col-md-10 col-sm-8 col-xs-10 col-lg-10"><h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">Devarshi Roy</h5> <p class="commentText messageContent col-md-12 col-sm-12 col-xs-12 body2">Hi</p><unreadmsg-comp></unreadmsg-comp></div>
                                </div>
                            </div>
                            <div>
                            <button class="btn btn-primary createMsgBtn" v-on:click="sendNewMessageAction"><i class="material-icons">message</i></button>
                            </div>
                        </ul>
                    </div>
				
			</div>`,
	methods : {
		sendNewMessageAction : function(){
			this.$emit('newmessagetoggle')
		}
	}
})