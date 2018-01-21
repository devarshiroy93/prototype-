var firstComponent = Vue.component('login-reg', {
    props: ['message'],
    'template': `<div>
                    <div><loader-comp :state = "loaderState" size = "big"></loader-comp></div>
				     <div>
						<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 col-lg-offset-4 col-md-offset-4 col-sm-offset-4">
						<div class="panel-body login">
                        <div class="row">
                            <div class="col-lg-12">
                                <form id="google-login-form" role="form">
                                 <div class="row"><div class="col-md-12"><center><h3 class='loginHeader'>Login to Your Account.</h3></center></div>
                                 <div class="col-md-12 col-sm-12 col-xs-12" ><center><img class="profile-img" src="asset/defaultAvatar.png" alt=""></center></div>
                                 <div class="col-sm-12 col-xs-12"><img src="asset/google.png" id="google-img" class="img-responsive" v-on:click="gSignin()"></div> </div>
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
        bindAuthState: function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user !== null || user) {
                    router.push({
                        name: 'dashboard'
                    }) //redirects to login page on successfull login
                    store.commit('assignCurrentUser', user);
                } else {

                };
            });
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
        this.bindAuthState();
        if (this.$route.params.message) {
            //this.error = false
        }
        this.bindAuthState();
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
    },
    {
        path: '/searchResults',
        name: 'searchResultsComp',
        component: searchResults,
        props: true
    },
    {
        path: '/message/:id',
        name: 'messaging-comp',
        component: messenger,

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
    mounted: function () {
        //this.loadScriptsAsync("https://www.gstatic.com/firebasejs/4.2.0/firebase.js");
        //this.loadScriptsAsync("config/fbaseConnect.js");
        this.loadCssAsync('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
        this.loadCssAsync('css/styles.css');
        this.loadCssAsync('https://fonts.googleapis.com/icon?family=Material+Icons');
        this.loadServiceWorkerforApp();
    },
    methods: {
        loadScriptsAsync: function (url) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = url;
            var x = document.getElementsByTagName('head')[0];
            x.appendChild(s);
        },
        loadCssAsync: function (url) {
            var l = document.createElement('link');
            l.rel = 'stylesheet';
            l.href = url
            var h = document.getElementsByTagName('head')[0];
            h.parentNode.insertBefore(l, h);
        },
        toggleSideBar: function () {

            store.commit('assignToggleForMobile', !this.toggleSideBarVar)
            this.toggleSideBarVar = !this.toggleSideBarVar
        },
        loadServiceWorkerforApp: function () {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                    navigator.serviceWorker.register('sw.js');
                });
            }
        }
    }
}).$mount('#app')

