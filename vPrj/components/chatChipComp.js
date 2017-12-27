Vue.component('chat-chip',{
    'props' : ['msg'],
    data : function(){
       return  {'class1' : '','class2' : '','class3' :''}
    },
    template :` <div v-bind:class="{'receiverPanel':class1,'senderPanel' : class2}"><div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 chatImage" v-if="class1"><img alt="Card image cap" class="img-responsive" src="https://lh3.googleusercontent.com/-hU5QCbUp_lU/AAAAAAAAAAI/AAAAAAAAAb8/-XvzN_1BBVU/photo.jpg"></div><span v-bind:class="{'receiverPanelMsg':class1,'senderPanelMsg' : class2}">{{msg.text}}</span><span class="body3"  v-bind:class="{'receiverMsgTime':class1,'senderMsgTime' : class2}"><span>11:58 AM</span></span></div>`,
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