Vue.component('message-panel',{// changes need to be made in recipient prop for handling group messaging.
    props :['showComp','recipient','convMsgList'],
    data : function(){
        return {
            messageText : '',
            isTyping : false,
            messageTextLength : 0,
            typingTimeout : ''
        }

    },
    template :`<div >
    
      <div class="col-md-8 col-lg-9 col-sm-8 col-xs-12 chatWindow" v-if="showComp"  v-scrolling = "'chatWindowMessageChain'">
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
                                        <typing-indicator :user ="recipient.displayName" :isTyping = "isTyping"></typing-indicator>
                                    </div>
                                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 sendMessagePanel">
                                        <div class="col-md-11 col-lg-11 col-sm-11 col-xs-11  ">
                                            <div class="form-group">
                                                <label for="chatInput"></label>
                                                <input type="text" class="form-control " id="chatInput" v-model="messageText" placeholder="Type a message" @keyup ="typingChange($event)"/>
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
           
            if(text !==""){
                var messageInfoObject;
                messageInfoObject = {};
                messageInfoObject={
                    'userSenderId' : store.getters.getCurrentUser.uid,
                    'recipient' : this.recipient.uid ,
                    'text' : text.toString(),
                    'timeStamp' : Date.now(),
                    'key' : this.assignConvKey()
                };
                if(messageInfoObject.recipient && messageInfoObject.userSenderId){
                   this.$emit('send-click', messageInfoObject);
                   this.messageText = "";
                   this.isTyping = false;
                   this.typingTimeout !== ''?clearTimeout(this.typingTimeout) : '';
                }
                else{
                    alert('please define a recipient');
                }
            }
        },
        assignConvKey : function(){
            var key;
            if(this.recipient.convKey){
                key = this.recipient.convKey;
            }else{
                key = this.recipient.key
            }
            return key;
        },
        typingChange : function(event){
            var isTyping;
            this.typingTimeout !== ''?clearTimeout(this.typingTimeout) : '';
            this.messageTextLength = this.messageText.length;
            if(this.messageText.length>0){
                isTyping = true;
                
            }else{
                isTyping = false;
              
            }
            this.$emit('typing-indicator',isTyping);
            this.typingTimeout = setTimeout(function(){
                if(this.messageTextLength === this.messageText.length ){
                    this.isTyping = false
                }
            }.bind(this),2000)
            this.isTyping = isTyping;            
        }
        
    }
})