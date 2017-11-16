var messenger = Vue.component('messaging-comp',{
    props : [],
    template : `<div>
                    <div class="messagingComp col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div><message-list v-on:newmessagetoggle = "showCreateMessageComp"></message-list></div>
                        <div><message-panel :showComp = "!showCreateComp"></message-panel></div>
                        <div><create-message :showComp= "showCreateComp"></create-message></div>
                    </div>   
                </div>`,
                data : function(){
                    return {
                        showCreateComp : false,
                        recipientArray : []
                    }
                },
                methods : {
                    showCreateMessageComp : function(){
                        this.showCreateComp = true
                    }
                }
})
