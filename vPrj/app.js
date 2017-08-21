
var firstComponent  = Vue.component('login-reg',{
	props : ['message'],
	'template':`<div>
				     <div class="row">
						<div class="col-md-6 col-xs-12  col-md-offset-3">
							<div class="panel panel-login">
								<div class="panel-heading">
									<div class="row">
										<div class="col-xs-6">
										<a href="#/login" :class= activeClassLogin id="login-form-link" v-on:click="toggleView('login')">Login</a>
										</div>
										<div class="col-xs-6">
										<a href="#/login" id="register-form-link" :class= activeClassRegister v-on:click="toggleView('register')">Register</a>
										</div>
									</div>
									<hr>
									<div v-if ="message"><alert-comp :visibility = message :state = "state"></alert-comp></div>
								</div> 
								<div class="panel-body login">
                        <div class="row">
                            <div class="col-lg-12">
                                <form id="login-form" role="form" class="" v-if='view=="login"'>
                                    <div class="form-group">
                                        <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" required>
                                    </div>
                                    <div class="form-group text-center">
                                        <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
                                        <label for="remember"> Remember Me</label>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3 col-xs-offset-3 col-xs-6">
                                                <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login btn-success disabled interactive-text" value="Log In" >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="text-center">
                                                    <a href="#" tabindex="5" class="forgot-password">Forgot Password?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
				                    <div class="row">
                                        <div class="col-sm-6 col-xs-12"><img src="asset/Login_WithGoogle.jpg" v-on:click="gSignin()" id="google-img"/></div>
                                        <div class="col-sm-6 col-xs-12 disabledOpacity"><img src="asset/Login_WithFacebook.jpg" id="fb-img"/></div>
                                    </div>
                                </form>
                                <form id="register-form" role="form" v-if='view=="register"'>
                                    <!-- <div class="form-group">
                                        <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
                                    </div> -->
                                     <div class="form-group">
                                        <input type="text" name="firstname" id="firstname" class="form-control" placeholder="Firstname" value="" required >
                                    </div>
                                     <div class="form-group">
                                        <input type="text" name="lastname" id="lastname" tabindex="1" class="form-control" placeholder="Lastname" value="" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="dob" id="dob" tabindex="1" class="form-control date-picker" placeholder="Birth Date" value="" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password" required>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3">
                                                <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register btn-primary interactive-text" value="Register Now">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
							</div>
						</div>				
					</div>
				</div>
				`,
		 
		data: function () {
			return {
				view: 'login',
				activeClassLogin : 'active',
				activeClassRegister : '',
				state: 'error'
			}
		},
			methods : {
				toggleView : function(userChoice){
					this.view = userChoice
					if(this.view === 'login'){ 	
						this.activeClassLogin ="active" ;
						this.activeClassRegister = ""
					} 
					else{ 
						this.activeClassRegister = "active" ;
						this.activeClassLogin =""
					}
				},
				gSignin : function(){
                 var  promise =  signingInService(router);
				 promise.then(function(result){
					 console.log(result);
					 if(result.credential){
						  router.push({ name: 'dashboard', params: {user: result.user }})//redirects to login page on successfull login
					 }else{ 
						if(router.currentRoute.path === "/"){
							router.push({ name: 'login', params: {message: true }})
						}
						else{
							router.push({ name: 'index', params: {message: true }})
						}
					 }
					 
				 }.bind(this))
				}
				
			},
				created : function(){
					if(this.$route.params.message){
						//this.error = false
					}
				}

})


const routes = [
    	{ path: '/login', name:'login', component: firstComponent,props:true  },
		{path :'/dashboard',name:'dashboard',component : dashboardComp,props:true },
		{ path: '/', name:'index',component: firstComponent,props :true	}
    
]
const router = new VueRouter({
    routes
})

var app = new Vue({
  el: '#app',
  router,
  data: {
    brandName: 'Proto'
  }
}).$mount('#app')
