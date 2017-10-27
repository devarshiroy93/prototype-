var messenger = Vue.component('messaging-comp',{
    template : `<div>
                    <div class= "col-md-12">
    
                    <div class="col-md-3 messageContainer">Message list will appear here</div>
                
                    <div class="col-md-1 "></div>

                    <div class ="col-md-8 messageContainer ">
                        <div class ="panel panel-primary">
                            <div class="panel-heading"><span class="glyphicon glyphicon-comment"></span>Chat</div>
                             <div class ="panel-body">
                        </div>
                        <div class="panel-footer">
                            <div class="input-group">
                                <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />
                                <span class="input-group-btn">
                                    <i class="material-icons">send</i>
                                </span>
                            </div>
                        </div>
                        </div>
                       
                    </div>
                    </div>
                </div>`
})