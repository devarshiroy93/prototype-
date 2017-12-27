Vue.component('message-list',{
    'props':  ['messageData'],
    'data' :  function(){
        return {'count' : 0}
    },
    'template' :`<div>
                    <div class="col-md-4 col-lg-3 col-sm-4 hidden-xs col-xs-12 friendRequestPanel messageList scrollbar-customised"><div><span class="messageHeader subheader">Messages</span></div>
                        <hr class="divider">
                        <div v-if="messageData!== undefined ">
                        <div  v-for ="(conv,i) in messageData">
                        <messagecontactcard  @selected-conv = "getSelectedConversation($event)" :rawData = conv :index= i @notif-play = "notifPlayEmit"></messagecontactcard>
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
           if(this.count === 0 || data.type === "userSelected" ){
                this.$emit('selected-user',data);
                this.count+=1;// code for fetching first message from conversation list 
           }
        },
        notifPlayEmit : function(){
            this.$emit('play-notif');
        }
    }, 
    created : function(){
        
    }
})




