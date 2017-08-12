Vue.component('sidebar-comp',{
props: ['userData'],
template : `<div>
                    <div class="">
                        <img class="card-img-top sideBarImgClass" :src="userData.photoURL" alt="Card image cap">
                            <div class="card-block">
                                <ul class="sidebar-comp subheader">
                                    <li><i class="material-icons" aria-hidden="true">create</i>Edit Profile</li>
                                    <li><i class="material-icons" aria-hidden="true">local_post_office</i>Your Posts</li>
                                    <li><i class="material-icons" aria-hidden="true">supervisor_account</i>Friends</li>
                                </ul>
                            </div>
                    </div>
				
			</div>`

})
