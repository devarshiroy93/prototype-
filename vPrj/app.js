var firstComponent = Vue.component('login-reg', {
    props: ['message'],
    'template': `<div>
                    <div><loader-comp :state = "loaderState" size = "big"></loader-comp></div>
				     <div>
						<div class="col-md-6 col-xs-12 col-lg-offset-3 col-lg-6 col-md-offset-3">
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
									
								</div> 
								<div>
								<div v-if ="message"><alert-comp :visibility = message :state = "state"></alert-comp></div>
								</div>
								<div class="panel-body login">
                        <div class="row">
                            <div class="col-lg-12">
                                <form id="login-form" role="form" class="" v-if='view=="login"'>
                                   <div class="input-group my-input form-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input id="login-username" type="text" class="form-control body1" name="username" value="" placeholder="username or email" required>
                                </div>

                                <div class="input-group my-input form-group">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                    <input id="login-password" type="password" class="form-control body1" name="password" placeholder="password" required>
                                </div>
                                    <div class="form-group text-center">
                                        <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
                                        <label for="remember" class="body2"> Remember Me</label>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-4 col-sm-offset-4 col-lg-6 col-lg-offset-3 col-xs-offset-3 col-xs-6">
                                                <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login primary-btn disabled interactive-text" value="Log In" >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="text-center">
                                                    <a href="#" tabindex="5" class="forgot-password body3">Forgot Password?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
				                    <div class="row">
                                        <div class="col-sm-6 col-xs-12"><img src="asset/google.png" class="img-responsive" v-on:click="gSignin()" id="google-img"/></div>
                                        <div class="col-sm-6 col-xs-12 disabledOpacity"><img src="asset/Login_WithFacebook.png" class="img-responsive" id="fb-img"/></div>
                                    </div>
                                </form>
                                <form id="register-form" role="form" v-if='view=="register"'>
                                    <!-- <div class="form-group">
                                        <input type="text" name="username" id="username" tabindex="1" class="form-control body1" placeholder="Username" value="">
                                    </div> -->
                                     <div class="form-group">
                                        <input type="text" name="firstname" id="firstname" class="form-control body1" placeholder="Firstname" value="" required >
                                    </div>
                                     <div class="form-group">
                                        <input type="text" name="lastname" id="lastname" tabindex="1" class="form-control body1" placeholder="Lastname" value="" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" name="email" id="email" tabindex="1" class="form-control body1" placeholder="Email Address" value="" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="dob" id="dob" tabindex="1" class="form-control date-picker body1" placeholder="Birth Date" value="" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="password" id="password" tabindex="2" class="form-control body1" placeholder="Password" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control body1" placeholder="Confirm Password" required>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3">
                                                <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn primary-btn interactive-text" value="Register Now">
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
            activeClassLogin: 'active',
            activeClassRegister: '',
            state: 'error',
            loaderState: '',
            isMobile: false
        }
    },
    methods: {
        toggleView: function (userChoice) {
            this.view = userChoice
            if (this.view === 'login') {
                this.activeClassLogin = "active";
                this.activeClassRegister = ""
            } else {
                this.activeClassRegister = "active";
                this.activeClassLogin = ""
            }
        },
        gSignin: function () {
            this.loaderState = 'loading'
            var promise = signingInService(router);
            promise.then(function (result) {
                if (result.credential) {
                    this.loaderState = ''
                    router.push({
                        name: 'dashboard'
                    }) //redirects to login page on successfull login
                    store.commit('assignCurrentUser', result.user);
                } else {
                    if (router.currentRoute.path === "/") {
                        this.loaderState = ''
                        router.push({
                            name: 'login',
                            params: {
                                message: true
                            }
                        })
                    } else {
                        this.loaderState = ''
                        router.push({
                            name: 'index',
                            params: {
                                message: true
                            }
                        })
                    }
                }

            }.bind(this))
        }

    },
    created: function () {
        if (this.$route.params.message) {
            //this.error = false
        }
    }

})


const routes = [
    {
        path: '/login',
        name: 'login',
        component: firstComponent,
        props: true
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboardComp,
        props: true
    },
    {
        path: '/',
        name: 'index',
        component: firstComponent,
        props: true
    },
    {
        path: '/post',
        name: 'singularpage',
        component: individualPostcomp,
        props: true
    },
	{
        path: '/editProfile',
        name: 'editProfilepage',
        component: newComp,
        props: true
    },
	{
        path: '/friends/:id',
        name: 'friendList',
        component: friendListComp,
        props: true
    }

]
const router = new VueRouter({
    routes,
    store
})

var app = new Vue({
    el: '#app',
    router,
    data: {
        brandName: 'Proto',
        toggleSideBarVar: false
    },
    created: function () {
        if (window.innerWidth <= 767) {
            store.commit('assignView', true);
        }
		
    },
	mounted : function(){
		//this.loadScriptsAsync("https://www.gstatic.com/firebasejs/4.2.0/firebase.js");
		//this.loadScriptsAsync("config/fbaseConnect.js");
		this.loadCssAsync('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
		this.loadCssAsync('css/styles.css');
		this.loadCssAsync('https://fonts.googleapis.com/icon?family=Material+Icons');
	},
    methods: {
		loadScriptsAsync : function(url){
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = url;
			var x = document.getElementsByTagName('head')[0];
			x.appendChild(s);
		},
		loadCssAsync : function(url) {
			var l = document.createElement('link');
			l.rel = 'stylesheet';
			l.href = url
			var h = document.getElementsByTagName('head')[0];
			h.parentNode.insertBefore(l, h);
    },
        toggleSideBar: function () {

            store.commit('assignToggleForMobile', !this.toggleSideBarVar)
            this.toggleSideBarVar = !this.toggleSideBarVar
        }
    }
}).$mount('#app')
