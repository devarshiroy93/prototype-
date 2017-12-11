Vue.component('message-list',{
    'props':  ['messageData'],
    'template' :`<div>
                    <div class="col-md-4 col-lg-3 col-sm-4 hidden-xs col-xs-12 friendRequestPanel messageList scrollbar-customised"><div><span class="messageHeader subheader">Messages</span></div>
                        <hr class="divider">
                        <div v-if="messageData!== undefined ">
                        <div  v-for ="conv in messageData">
                        <div  class="col-md-12 col-lg-12 col-sm-12 col-xs-12 otherUserComment friendRequest"  @click= "getSelectedConversation(conv)">
                                    <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img :src="conv.displayDetails.photoURL" alt="Card image cap" class="img-responsive">
                                    </div>
                                    <div class="col-md-10 col-sm-10 col-xs-8 col-lg-10">
                                        <h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{conv.displayDetails.displayName}}</h5>
                                        <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{conv.text}}</p><span><unreadmsg-comp :conversation = "conv"></unreadmsg-comp></span>
                                    </div>
                                </div>
                        </div>
                        </div>
                        <div>
                        <button class="btn btn-primary createMsgBtn" v-on:click="sendNewMessageAction"><i class="material-icons">message</i></button>
                        </div>
                    </div>
				
			</div>`,
	methods : {
		sendNewMessageAction : function(){
			this.$emit('newmessagetoggle')
		},
        getSelectedConversation : function(data){
            console.log(data);
            this.$emit('see-conversation',data);
        }
    }, 
    created : function(){
        
    }
})