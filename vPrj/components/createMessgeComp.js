Vue.component('create-message',{
    props : ['showComp'],
    data : function(){
        return {
            inputString : '',
            searchResults : [],
        }
    },
    template : `<div>
                    <div class="col-md-8 col-lg-9 col-sm-8 col-xs-12 chatWindow" v-if="showComp">
                            <form>
                                <div class="group">   
                                    <input id =" searchFriend" type="text" required  placeholder="Search Friends" v-model="inputString " v-on:change = "fetchfriendSuggestion">
                                    <span class="highlight"></span>
                                    <span class="bar"></span>
                                </div>
                            </form>
                            <ul class="list-group" v-if="searchResults.length>0">
                                <div v-for="user in searchResults"><user-cards :friend="user"></user-cards></div>
                            </ul>
                    </div>
                </div>`,
    methods : {
        fetchfriendSuggestion : function(){
            this.searchResults = [];
            this.getSuggestions(this.inputString)
        },
        getSuggestions : function(userString){
            firebase.database().ref('users').on('child_added', function (snapshot) {
			this.compareQuery(userString,snapshot.val())
		}.bind(this))
        },
        compareQuery: function (userString,user) {
            if (userString === ""){
                 this.searchResults = [];
            }
            else{
                if (user.displayName.toLowerCase().indexOf(userString.toLowerCase()) !== -1) {
				console.log(user.displayName)
                if(store.getters.getCurrentUser.uid !== undefined && store.getters.getCurrentUser.uid !== user.uid){
                    this.searchResults.push(user);
                }
			}
            }
			
		}
    }
})