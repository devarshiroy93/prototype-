var messenger = Vue.component('messaging-comp',{
    template : `<div>
                    <div class="messagePanel">
                    <div class="col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8 col-sm-offset-2 col-sm-8 col-xs-12 friendRequestPanel">
                        <div><span class="messageHeader subheader">Messages</span><span class="material-icons messageSearch">search</span></div>
                        <hr class="divider">
                        <ul class="list-group">
                            <div>
                                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 otherUserComment friendRequest">
                                    <div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 commentImage"><img src="https://lh3.googleusercontent.com/-U8ToaA2kZh4/AAAAAAAAAAI/AAAAAAAAADI/z-Qjz5DJOXY/photo.jpg" alt="Card image cap" class="img-responsive"></div> <div class="col-md-10 col-sm-10 col-xs-10 col-lg-10"><h5 class="commentTitle col-md-12 col-sm-12 col-xs-12 body2">Devarshi Roy</h5> <p class="commentText messageContent col-md-12 col-sm-12 col-xs-12 body2">Hey Chandan! How r u doing?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div><div class="newMessageCount">2</div>
                                </div>
                            </div>
                        </ul>
                    </div>
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
                    }

                }
})