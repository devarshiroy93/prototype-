var dashboardComp = Vue.component('dash-comp',{
props : ['user'],
template : `<div>
                <div class ="col-md-2 col-sm-3 col-xs-12 sidebar-content"><sidebar-comp :userData = user.providerData[0]></sidebar-comp></div>
                <div class="col-md-8 col-sm-7 col-xs-12">
                    <div v-if="user.providerData[0] !== undefined" >
				        <h3>Welcome to Dashboard</h3><h1>{{user.providerData[0].displayName}}</h1>
				    </div>
                </div>
                <div class ="col-md-2 col-sm-2 col-xs-6"> 
                <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-danger interactive-text" value="Log Out" v-on:click="gSignOut()">
                </div>
            </div>`,
										
methods :{
	
	gSignOut : function(){
		singingOutService(router)
	}
},
    created:function(){
        if(this.$route.params.user === undefined){
            router.push('login')
        }
    }
										
})
