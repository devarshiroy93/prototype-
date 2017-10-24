Vue.component('notification-comp', {//will show notifications for friend requests and post activity (Eg Like,Comment)
    template: `<div>
                    <div class="notificationComp notificationHeader col-md-12 col-lg-12 col-sm-12 col-xs-12" v-if="notificationsArray.length>0">
                        <div class="notificationHeader subheader">
                         <div class="notificationBody body2">
                         <p v-for = "notification in notificationsArray">
                         <router-link :to='"/friends/"+userId' ><i class="material-icons">notifications</i></span>{{notification.message}}</router-link>
                         </p>
                         <p  v-if="postActivityNotifications.length>0" v-for = "notification in notificationsArray" >
                         </p>
                        </div>
                        </div>
                       
                    </div>
                </div>`,
    data: function () {
        return {
            userId: '',
            friendRequestCount: 0,
            friendRequestAccepted: [],
            notificationsArray: [],
            postActivityNotifications: []
        }
    },
    methods: {
        notificationsComposer: function (source) {
            var messagesObject = messageComposer;
            if (source === "friendRequestAcceptance") {
                if (this.friendRequestAccepted.length === 1) {
                    message = this.friendRequestAccepted[0].friendName;
                } else if (this.friendRequestAccepted.length === 2) {
                    for (var i = 0; i < 2; i++) {
                        message = this.friendRequestAccepted[0].friendName + ' ' + this.friendRequestAccepted[1].friendName;
                    }
                } else {
                    for (var i = 0; i < 2; i++) {
                        message = this.friendRequestAccepted[0].friendName + ' ' + this.friendRequestAccepted[1].friendName;
                    }
                    var remCountOfAcceptance = this.friendRequestAccepted.length - 2;
                    message += ' and' + remCountOfAcceptance + ' others';
                }
                message += ' ' + messagesObject.notificationMessages.requestAcceptanceMessageTail;

                this.notificationsArray.push({ 'message': message });
            } else if (source === "friendRequestReceival") {
                if (this.friendRequestCount > 0) {
                    message = messagesObject.notificationMessages.requestReceivalMessageHead;
                    this.friendRequestCount === 1 ? message += this.friendRequestCount + " " + messagesObject.notificationMessages.requestReceivalMessageTail : message += this.friendRequestCount + " " + messagesObject.notificationMessages.requestReceivalMessageTail + 's';
                    this.notificationsArray.push({ 'message': message });
                }

            }

        },
        fetchFriendRequestcount: function () {

            firebase.database().ref('friendRequests/friendRequestsCount').child(this.userId).once('value').then(function (snap) {
                this.friendRequestCount = snap.exportVal();
                if (this.friendRequestCount !== null) {
                    this.notificationsComposer('friendRequestReceival');

                }
            }.bind(this))
        },
        fetchFriendReqestAcceptance: function () {
            var tableName = "notifications";
            var subChild = 'friendRequestAcceptance';
            fetchDatafromTable(tableName, this.userId, subChild).then(function (data) {
                if (data.val() !== null && data.val() !== undefined) {
                    var keys = Object.keys(data.val());
                    for (var i = 0; i < keys.length; i++) {
                        this.friendRequestAccepted.push(data.val()[keys[i]]);
                        store.commit('assignFriendsNotifications',this.friendRequestAccepted)
                        this.notificationsComposer('friendRequestAcceptance')
                    }
                }

            }.bind(this));
        },
        fetchPostActivitynotifications: function () {
            firebase.database().ref().on('child_added', function () {

            })
        },

    },
    created: function () {
        this.userId = store.getters.getCurrentUser.uid;
        this.fetchFriendRequestcount();
        if (store.getters.getFriendsNotifications.length === 0) {
            this.fetchFriendReqestAcceptance();
        } else {
            this.friendRequestAccepted = store.getters.getFriendsNotifications;
            this.notificationsComposer('friendRequestAcceptance');
        }

        //this.fetchPostActivitynotifications();
    }
})