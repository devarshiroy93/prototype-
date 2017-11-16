var messenger = Vue.component('messaging-comp',{
    template : `<div>
                    <div class="messagingComp col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div><message-list></message-list></div>
                        <div><message-panel></message-panel></div>
                    </div>   
                </div>`,
                data : function(){
                    return {
                        showModal : false,
                        recipientArray : []
                    }
                },
                methods : {
                    openModal : function(){
                        this.showModal = true;
                    },
                    closeModal : function(){
                        this.showModal =  false;
                    },
                    assignUser : function(user){
                        console.log(user);
                        this.recipientArray.push(user)
                    },
                    removeRecipients : function(user){
                        for(var i =0;i<this.recipientArray.length;i++){
                            if(this.recipientArray[i].uid === user.uid){
                                this.recipientArray.splice(i,1);
                            }
                        }
                    },
                    showSearchBar:function(){
                        
                    }
                }
})
