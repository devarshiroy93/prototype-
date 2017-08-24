const store = new Vuex.Store({
	state: {
		user :{},
	},
	mutations  : {
		assignCurrentUser (state,user){
			state.user = user
		}
	},
	getters :{
		getCurrentUser (state){
			return state.user;
		}
	}
  
}
  )