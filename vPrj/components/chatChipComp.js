Vue.component('chat-chip',{
    'props' : ['msg'],
    data : function(){
       return  {'class1' : '','class2' : '','class3' :''}
    },
    template :` <div v-bind:class="{'receiverPanel':class1,'senderPanel' : class2}"><span v-bind:class="{'receiverPanelMsg':class1,'senderPanelMsg' : class2}">{{msg.text}}<span class="body3"  v-bind:class="{'receiverMsgTime':class1,'senderMsgTime' : class2}"><span>11:58 AM</span></span></span></div>`,
    methods :{
        determinePanelClass : function(){
            if(this.msg.userSenderId !== store.getters.getCurrentUser.uid){
                this.class1 = true;
                this.class2 = false;
            }else{
                this.class1 = false;
                this.class2 = true;
            }
        }
    },
    created : function(){
        this.determinePanelClass();          
    }
})