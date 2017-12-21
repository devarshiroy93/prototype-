Vue.component('message-list',{
    'props':  ['messageData'],
    'data' :  function(){
        return {'count' : 0}
    },
    'template' :`<div>
                    <div class="col-md-4 col-lg-3 col-sm-4 hidden-xs col-xs-12 friendRequestPanel messageList scrollbar-customised"><div><span class="messageHeader subheader">Messages</span></div>
                        <hr class="divider">
                        <div v-if="messageData!== undefined ">
                        <div  v-for ="conv in messageData">
                        <messagecontactcard  @selected-conv = "getSelectedConversation($event)" :rawData = conv></messagecontactcard>
                        </div>
                        </div>
                        <div>
                        <button class="btn btn-primary createMsgBtn" v-on:click="sendNewMessageAction"><i class="material-icons">message</i></button>
                        </div>
                    </div>
				
			</div>`,
	methods : {
		sendNewMessageAction : function(){
			this.$emit('newmessagetoggle')
		},
        getSelectedConversation : function(data){
           if(this.count === 0 || data.type === "userSelected" ){
                this.$emit('selected-user',data);
                this.count+=1;
           }
        }
    }, 
    created : function(){
        
    }
})


//new component starts

Vue.component('messagecontactcard',{
    'props' : ['rawData'],
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
                
            }
    } ,
    'template' : `<div>
                        <div  class="col-md-12 col-lg-12 col-sm-12 col-xs-12 otherUserComment friendRequest" v-if="userData.show" @click= "selectConversation(userData,'click')">
							<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img :src="userData.photoURL" alt="Card image cap" class="img-responsive">
							</div>
							<div class="col-md-10 col-sm-10 col-xs-8 col-lg-10">
								<h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">{{userData.displayName}}</h5>
							    <p class="commentText col-md-12 col-sm-12 col-xs-12 body3">{{userData.text}}</p>
                                <unreadmsg-comp :convKey = rawData.key ></unreadmsg-comp>
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
        },
        selectConversation : function(convData){
            convData.type = 'userSelected'
            this.$emit('selected-conv',convData);
        }
    }
})

//new component ends