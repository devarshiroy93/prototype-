Vue.component('search-comp',{
	'template' : `<div>
					<div class="searchComp">
						<div class="row">
							<div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">
								<div class="searchContainer"> 
									<div class="input-group stylish-input-group">
										<input type="text" class="form-control" v-model="searchString" v-on:keydown="searchFunction(searchString,$event)" placeholder="Search Proto" >
										<span class="input-group-addon">
											<button type="submit" v-on:click = searchFunction(searchString,$event)>
												<span class="material-icons">search</span>
											</button>  
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>`,
	'data' : function(){
		return{
			searchString : ''
		}
	},
	methods : {
		searchFunction : function(searchText,event){
			if(searchText !== "" ||searchText.length !== 0){
				if(event.key === "Enter" || event.type === "click"){
				this.$emit('search-click',searchText)
				}
			}
			
		}
	}
})