Vue.component('unreadmsg-comp',{
    props :['convKey'],
     data: function(){
        return {
            unreadMsgCount : 0
        }
     },
    template : `<div>
                    <div v-if=" unreadMsgCount>0 && unreadMsgCount !== undefined"> 
                        <div class="newMessageCount">{{unreadMsgCount}}</div>
                    </div>
                </div>`,

   created : function(){
       this.fetchUnreadData();
       this.registerUnreadCountChanges();
   },
   methods : {
       fetchUnreadData : function(){
        messagingService.fetchUnreadMessageCountList(this.convKey,store.getters.getCurrentUser.uid).then(function(snap){
            this.unreadMsgCount = snap.data
        }.bind(this));
       },
       registerUnreadCountChanges : function(){
           firebase.database().ref('unreadMessageCountList').child(store.getters.getCurrentUser.uid).on('child_changed',function(snap){
                this.unreadMsgCount = snap.val();
           }.bind(this))
       }
       
   }
})