Vue.component('sidebar-comp', {
    props: ['userData','userUid'],
    template: `<div>
                    <div class="">
                        <img class="card-img-top sideBarImgClass" :src="userData.photoURL" alt="Card image cap">
					<div class="userInfo interactive-text">
						<p>{{userData.displayName}}</p>
						<p>{{userData.email}}</p>
					</div>		
						 <div class="card-block">
                                <ul class="sidebar-comp interactive-text">
                                    <li><router-link to="/editProfile"><i class="material-icons" aria-hidden="true">create</i>Edit Profile</router-link></li>
                                    <li><i class="material-icons" aria-hidden="true">local_post_office</i>Posts</li>
                                    <li><router-link :to='"/friends/"+userUid' ><i class="material-icons" aria-hidden="true">group</i>Friends</router-link></li>
                                    <li><router-link :to='"/message/"+userUid' ><i class="material-icons">message</i>Messages</router-link></li>
                                </ul>
                            </div>
                    </div>
				<div class ="col-md-offset-3 col-md-6 col-sm-offset-3 col-sm-6 col-xs-offset-3 col-xs-6 logOutBtn">
                <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-default interactive-text logOut" value="Log Out" v-on:click="gSignOut()">
                </div>
			</div>`,
    methods: {

        gSignOut: function () {
            var promise = singingOutService();
            promise.then(function (result) {
                result ? router.push('login') : alert('signout not successful')
                store.commit('assignCurrentUser', {});
                //store.commit('assignView', false);
               // store.commit('assignToggleForMobile', false);
                store.commit('assignCommentList', []);
                store.commit('assignCurrentPostKey', '');
				store.commit('assignFriends', [])
				
            }.bind(this));

        }
    },
})

