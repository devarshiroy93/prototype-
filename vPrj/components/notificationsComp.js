Vue.component('notification-comp', {//will show notifications for friend requests and post activity (Eg Like,Comment)
    template: `<div>
                    <div class="notificationComp notificationHeader col-md-12 col-lg-12 col-sm-12 col-xs-12" v-if="friendRequestCount > 0 || postNotifications ">
                        <div class="notificationHeader subheader">
                         <div class="notificationBody body2">
                         <div v-if="friendRequestCount>0">
                         <p>
                         <router-link :to='"/friends/"+userId' ><i class="material-icons">notifications</i></span>You have {{friendRequestCount}} friend request<span v-if='friendRequestCount>1'>s</span></router-link>
                         </p>
                         </div>
                        </div>
                        </div>
                       
                    </div>
                </div>`,
    data : function(){
        return {
            userId  : '',
            friendRequestCount : 0,
            postNotifications : false
        }
    },
    methods :{
        fetchFriendRequestcount : function(){

            firebase.database().ref('friendRequests/friendRequestsCount').child(this.userId).once('value').then(function(snap){
                this.friendRequestCount = snap.exportVal()
            }.bind(this))
        },

    },
    created : function(){
        this.userId  = store.getters.getCurrentUser.uid;
        this.fetchFriendRequestcount();
    }
})