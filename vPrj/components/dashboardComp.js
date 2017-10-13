var dashboardComp = Vue.component('dash-comp', {

    template: `<div class="container dashboard">
                <div class ="col-lg-3 col-md-3 col-sm-3 col-xs-12 sidebar-content" :class = 'mobile'><sidebar-comp :userData = data.providerData[0] :userUid = data.uid></sidebar-comp></div>
                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 user-posts">
                    <div v-if="data!== undefined" >
                     <div v-if ="data.emailVerified"><alert-comp :visibility = data.emailVerified :state = "state" :userName = data.providerData[0].displayName></alert-comp></div>
					 	<notification-comp></notification-comp>
						<search-comp v-on:search-click = "navigateToSearchResultsPage($event)"></search-comp>
                        <create-post :userinfo=data></create-post>
						<modal-comp :showModal = showCustModal v-on:close-modal = "closeModal" :modalContent = modalContent></modal-comp>
						<div v-for = "partiCularPost in postData">
						<post-card :userUid=data.uid  :post = partiCularPost   v-on:add-friend = "addFriend($event)" v-on:postcard-created = "passData" v-on:show-likes = "showLikes($event)" ></post-card></div>
				    </div>
                </div>
            </div>`,
    data: function () {
        return {
            state: 'info',
            data: store.getters.getCurrentUser,
            isMobileView: store.getters.getCurrentView,
            mobile: '',
			postData : [],
			friendList :[],
			showCustModal : false,
			modalContent : "",
        }
    },
	methods :{
        passData : function(){
        },
        navigateToSearchResultsPage : function(searchText){
           router.push({ name: 'searchResultsComp', params: { userId : this.data.uid,searchString: searchText }})
        },
		fetchFriendList : function(){
			return firebase.database().ref('friends/'+this.data.uid).once('value').then(function(result){
				return result
			}).catch(function(error){
				return error
			})
		},
		fetchPostsOfFriends : function(friend){// fetched posts Data of friends
			firebase.database().ref('posts/'+friend.friendId).on('child_added',function(snap){
						var formattedObj = {}
						formattedObj = snap.val()
						formattedObj.key = snap.key;
						readableDate = processTimeStamp(formattedObj.timeStamp);
						formattedObj.timeStamp = readableDate
						this.postData.push(formattedObj);
					}.bind(this))
		
		},
		showLikes : function(data){
			this.modalContent = data;
			this.showCustModal = true
		},
		closeModal : function(){
			this.showCustModal = false;
		}
	},

    created: function () {
        if (this.data.uid === undefined) {
            router.push('login')
        }
       this.data.uid ? checkIfUserExists(this.data.uid, this.data):''; //this function checks if user exits in database or not .If not then pushes user data into database.
        console.log(this.isMobileView);
        this.isMobileView ? this.mobile = 'hidden-xs' : this.mobile = '';

		//code for loading friends
		
		this.fetchFriendList().then(function(response){
			var localDatakeys;
			if(response.val()!==null){
				localDatakeys = Object.keys(response.val())
				this.friendList = [];
				for(var  i= 0;i<localDatakeys.length;i++){
					this.friendList.push(response.val()[localDatakeys[i]]);
					this.fetchPostsOfFriends(response.val()[localDatakeys[i]])
					store.commit('assignFriends' ,this.friendList)
					
				}	
			}
		}.bind(this))
		
		//code for loading friends ends
		
        store.watch(function (state) {
            return state.toggleView
        }, function (data) {
            console.log(data)
            data ? this.mobile = '' : this.mobile = 'hidden-xs'
        }.bind(this))
		
		//database fetch for postCard
		
		var readableDate = '';
		var formattedObj ={} ;
			//adding handle to own posts
			firebase.database().ref('posts/'+this.data.uid).on('child_added',function(snapshot){
				formattedObj = snapshot.val()
				formattedObj.key = snapshot.key;
				readableDate = processTimeStamp(formattedObj.timeStamp);
				formattedObj.timeStamp = readableDate
				this.postData.push(formattedObj);
				this.postData = this.postData.reverse();
			}.bind(this))
			//adding handle to own posts end
		
    }

})
