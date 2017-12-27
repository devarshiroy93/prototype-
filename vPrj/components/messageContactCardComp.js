//new component starts
Vue.component('messagecontactcard',{
    'props' : ['rawData','index'],
    'data' :  function(){
            return {
                userData : {
                    show :false,
                    displayName  : '',
                    photoURL : '',
                    recipient :'',
                    text : '',
                    timeStamp : '',
                    userSenderId : '',
                    email : ''
                },
                databaseRef : ''
                
            }
    } ,
    'template' : `<div>
                        <div  class="col-md-12 col-lg-12 col-sm-12 col-xs-12 otherUserComment friendRequest" v-if="userData.show" @click= "selectConversation(userData,index)">
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img :src="userData.photoURL" alt="Card image cap" class="img-responsive">
							</div>
							<div class="col-md-10 col-sm-10 col-xs-8 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{userData.displayName}}</h5>
							    <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{userData.text}}</p>
                                <unreadmsg-comp :convKey = rawData.key @play-notif = "playNotifEmit" ></unreadmsg-comp>
							</div>
						</div>
                 </div>`,
    created : function(){
        
        this.userData.displayName = '';
        var displayNameId ;
        displayNameId = this.displayNameIdDecider(this.rawData) ;
        fetchUserData(displayNameId).then(function(data){
          
            this.addUserData(data); 
        }.bind(this));

    },
    methods :{
        displayNameIdDecider: function (rawData) {
            var returnValue;
            if (store.getters.getCurrentUser.uid === rawData.data.recipient) {
                returnValue = rawData.data.userSenderId
            }
            else {
                returnValue = rawData.data.recipient
            }
            return returnValue
        },
        addUserData : function(data){
            this.userData.displayName = data.displayName;
            this.userData.photoURL = data.photoURL;
            this.userData.text = this.rawData.data.text;
            this.userData.recipient =  this.rawData.data.recipient;
            this.userData.timeStamp = this.rawData.data.timeStamp;
            this.userData.userSenderId = this.rawData.data.userSenderId;
            this.userData.email = data.email;
            this.userData.uid = data.uid;
            this.userData.convKey = this.rawData.key
            this.userData.show = true;
            this.$emit('selected-conv',this.userData);
            
            this.lastMessageSetUpdateBind(this.userData.convKey);
        },
        selectConversation : function(convData,index){ //this method selects the contact card selected  
            convData.index = index;
            convData.type = 'userSelected'
            this.$emit('selected-conv',convData);
        },
        lastMessageSetUpdateBind : function(key){// this method is used here to the update the child message card component .
          this.databaseRef === "" ?  '' :ref.off('value', this.databaseRef);
          this.databaseRef =   firebase.database().ref('lastMessageSet/'+key).on('child_changed',function(snap){
                snap.key === "text" ? this.userData.text = snap.val():'';
            }.bind(this))
        },
        playNotifEmit : function(){
            this.$emit('notif-play');
        }
    }
})

//new component ends