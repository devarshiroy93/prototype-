var messenger = Vue.component('messaging-comp',{
    template : `<div>
                    <div class= "col-md-12">
                    <modal-comp :showModal = "showModal" :modalContent = "getFriends"  v-on:close-modal = "closeModal" v-on:get-user = "assignUser($event)" ></modal-comp>
                    <div class="col-md-3 messageContainer">Message list will appear here</div>
                
                    <div class="col-md-1 "></div>

                    <div class ="col-md-8 messageContainer ">
                        <div class ="panel panel-primary">
                            <div class="panel-heading"><span><i class="material-icons">message</i></span><span class="pull-right"><i class="material-icons" v-on:click = "openModal">create</i></span></div>
                             <div class ="panel-body">
                        </div>
                        <div class="panel-footer" v-if="false">
                            <div class="input-group">
                                <input id="btn-input" type="text" class="form-control input-lg" placeholder="Type your message here..." />
                                <span class="input-group-btn">
                                    <button class="btn btn-primary btn-lg" id="btn-chat">
                                    <i class="material-icons">send</i></button>
                                </span>
                            </div>
                        </div>
                        </div>
                       
                    </div>
                    </div>
                </div>`,
                data : function(){
                    return {
                        showModal : false,
                        getFriends : 'getFriends'
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
                    }

                }
})