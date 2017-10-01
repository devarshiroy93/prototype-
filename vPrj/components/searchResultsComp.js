var searchResults = Vue.component('searchresults-comp',{
	props : ['searchString'],
	template : `<div >
					<div class="row">
					<div class = "col-md-2"></div>
						<div class="col-md-8 "> 
							<ul class="list-group">
  								<li class="list-group-item"></li>
							</ul>
						</div>	
						<div class = "col-md-2"></div>
					</div>	
				</div>`,

	created : function(){

	}
})