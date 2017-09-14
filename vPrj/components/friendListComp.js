var friendListComp = Vue.component('friend-list',{
'props' : ['userUid'],
'template' : `<div>
				<div class="col-md-2"></div>
				<div class="col-md-8 col-sm-12 col-xs-12" >Friend Requests
				<ul class = "list-group">
					<div v-if="showRequestSection">
						<div>
						
						</div>
					</div>
				</ul>
				</div>
				<div class="col-md-2"></div>
			</div>`,
 data: function () {
        return {
			showRequestSection : false
        }
    },
}
)