Vue.component('message-panel',{
    props :['showComp'],
    template :`<div>
    
      <div class="col-md-8 col-lg-9 col-sm-8 col-xs-12 chatWindow" v-if="showComp">
                            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chatWindowHeader"><span class="material-icons backTobutton" title="Back">keyboard_backspace</span><div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 chatWindowImage"><img src="https://lh3.googleusercontent.com/-hU5QCbUp_lU/AAAAAAAAAAI/AAAAAAAAAb8/-XvzN_1BBVU/photo.jpg" alt="Card image cap" class="img-responsive"></div> <div class="col-md-8 col-sm-8 col-xs-8 col-lg-8"><h5 class="commentTitle chatWindowUserName col-md-12 col-sm-12 col-xs-12 subheader">Devarshi Roy</h5><p class="lastSeen body3">last seen today at 12:30 PM</p></div><span class="material-icons profileSetting" title="Settings">settings</span></div>
                            <ul class="list-group">
                                <div>
                                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chatWindowMessageChain scrollbar-customised">
                                        <!__ chat messages will go here __>
                                        <div class="receiverPanel"><span class="receiverPanelMsg">Receiver Panel...It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).<span class="receiverMsgTime body3">11:55 AM</span></span></div>
                                        <div class="senderPanel"><span class="senderPanelMsg">Sender Panel...It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).<span class="receiverMsgTime body3">11:58 AM</span></span></div>
                                    </div>
                                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 sendMessagePanel">
                                        <textarea class="col-md-11 col-lg-11 col-sm-11 col-xs-11 writeMessagePanel" placeholder="Start texting..."></textarea>
                                        <div class="col-md-1 col-lg-1 col-sm-1 col-xs-1 sendButtonPanel"><span class="material-icons sendButton" title="Send Message">send</span></div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
    </div>`
})