Vue.component('create-message',{
    props : ['showComp'],
    template : `<div>
                    <div class="col-md-8 col-lg-9 col-sm-8 col-xs-12 chatWindow" v-if="showComp">
                            <form>
                                <div class="group">   
                                <input id =" searchFriend" type="text" required  placeholder="Search Friends">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                 
                                </div>
                            </form>
                    </div>
                </div>`
})