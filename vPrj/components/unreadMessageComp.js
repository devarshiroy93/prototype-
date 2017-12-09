Vue.component('unreadmsg-comp',{
    props :[''],
     data: function(){
        return {
            unreadMsgCount : 0
        }
     },
    template : `<div>
                    <div v-if=" && unreadMsgCount !== undefined"> 
                        <div class="newMessageCount">{{unreadMsgCount}}}</div>
                    </div>
                </div>`,
})