Vue.component('sidebar-comp',{
props: ['userData'],
template : `<div>
                    <div class="">
                        <img class="card-img-top sideBarImgClass" :src="userData.photoURL" alt="Card image cap">
                            <div class="card-block">
                            <h4 class="card-title">{{userData.displayName}}</h4>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
				
			</div>`

})
