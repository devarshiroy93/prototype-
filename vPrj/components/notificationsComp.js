Vue.component('notification-comp', {//will show notifications for friend requests and post activity (Eg Like,Comment)
    template: `<div>
                    <div class="notificationComp notificationHeader col-md-12 col-lg-12 col-sm-12 col-xs-12" v-if="notificationsArray.length>0 || postActivityNotifications.length>0 ">
                        <div class="notificationHeader subheader">
                         <div class="notificationBody body2" >
                         <div v-if="notificationsArray.length>0">
                           <div v-for = "notification in notificationsArray">
                            <router-link :to='"/friends/"+userId'><i class="material-icons">notifications</i></span>{{notification.message}}</router-link>
                            </div>
                         </div>
                       <div v-if="postActivityNotifications.length>0">
                         <p   v-for = "notification in postActivityNotifications" >
                            <span v-on:click="navigateToPost(notification.postKey)"><i class="material-icons">notifications</i>{{notification.message}}</span>
                         </p>
                        </div> 
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
        notificationsComposer: function (source, postKey, commentator) {
            var message = '';
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

            } else {
                var msgBucket = {};
                message = commentator.friendName;
                if (commentator.count > 1) {
                    message = message + " " + messagesObject.postNotificationMessages.commentNotification.midMessage + " " + (commentator.count-1).toString() + " " + messagesObject.postNotificationMessages.commentNotification.others;
                } else {
                    message = message + " " 
                }
                message = message+ " " +  messagesObject.postNotificationMessages.commentNotification.messageTail;
                msgBucket = { 'message': message, 'postKey': postKey }
                this.postActivityNotifications.push(msgBucket);
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
                        store.commit('assignFriendsNotifications', this.friendRequestAccepted)
                        this.notificationsComposer('friendRequestAcceptance')
                    }
                }

            }.bind(this));
        },
        fetchPostActivitynotifications: function (user) {
            firebase.database().ref('notifications/postActivityNotifications/' + user).on('child_added', function (snap) {
                this.notificationsComposer('', snap.key, snap.val())
            }.bind(this))
        },
        navigateToPost: function (key) {
            router.push({ name: 'singularpage', params: { postData: key } });
        }

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

        this.fetchPostActivitynotifications(this.userId);
    }
})