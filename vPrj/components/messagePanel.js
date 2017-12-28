Vue.component('message-panel',{
    props :['showComp','recipient','convMsgList'],
    data : function(){
        return {
            messageText : ''
        }

    },
    template :`<div>
    
      <div class="col-md-8 col-lg-9 col-sm-8 col-xs-12 chatWindow" v-if="showComp" v-scrolling = "'chatWindowMessageChain'">
                            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chatWindowHeader"><span class="material-icons backTobutton" title="Back">keyboard_backspace</span>
                            <user-cards :friend = "recipient.displayDetails === undefined ? recipient : recipient.displayDetails"></user-cards>
                            </div>
                            <ul class="list-group">
                                <div>
                                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chatWindowMessageChain  scrollbar-customised">
                                        <!__ chat messages will go here __>
                                        <div v-if="convMsgList.length>0">
                                            <div  v-for="text in convMsgList">
                                                <chat-chip :msg = "text" :recipientImg = "recipient.photoURL"></chat-chip>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 sendMessagePanel">
                                        <div class="col-md-11 col-lg-11 col-sm-11 col-xs-11  ">
                                            <div class="form-group">
                                                <label for="chatInput"></label>
                                                <input type="text" class="form-control " id="chatInput" v-model="messageText" placeholder="Type a message"/>
                                            </div>
                                        </div>
                                        <div class="col-md-1 col-lg-1 col-sm-1 col-xs-1 sendButtonPanel" @click="sendClick(messageText)"><i class="material-icons">send</i></div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
    </div>`,
    methods : {
        determinePanelClass : function(){
            if(text.userSenderId !== store.getters.getCurrentUser.uid){
                return {class1 :'receiverPanel',class2 : 'receiverPanelMsg'}
            }else{
                return {class1 :'senderPanel',class2 : 'senderPanelMsg'}
            }
        },
        sendClick : function(text){
            var messageInfoObject;
            messageInfoObject = {};
            messageInfoObject={
                'userSenderId' : store.getters.getCurrentUser.uid,
                'recipient' : this.recipient.uid ,
                'text' : text.toString(),
                'timeStamp' : Date.now(),
                'key' : this.recipient.convKey
            };
            if(messageInfoObject.recipient && messageInfoObject.userSenderId){
               this.$emit('send-click', messageInfoObject);
            }
            else{
                alert('please define a recipient');
            }
            
        }
    }
})