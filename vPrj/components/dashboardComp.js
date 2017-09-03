var dashboardComp = Vue.component('dash-comp', {

    template: `<div class="container dashboard">
                <div class ="col-md-3 col-sm-3 col-xs-12 col-lg-3  sidebar-content" :class = 'mobile'><sidebar-comp :userData = data.providerData[0]></sidebar-comp></div>
                <div class="col-md-7 col-sm-8 col-xs-12 user-posts">
                    <div v-if="data.providerData[0] !== undefined" >
                        <div v-if ="data.emailVerified"><alert-comp :visibility = data.emailVerified :state = "state" :userName = data.providerData[0].displayName></alert-comp></div>
						<create-post :userinfo=data></create-post>
						<post-card :userUid=data.uid></post-card>
				    </div>
                </div>
            </div>`,
    data: function () {
        return {
            state: 'info',
            data: store.getters.getCurrentUser,
            isMobileView: store.getters.getCurrentView,
            mobile: ''
        }
    },

    created: function () {
        if (this.data.uid === undefined) {
            router.push('login')
        }
       this.data.uid ? checkIfUserExists(this.data.uid, this.data):''; //this function checks if user exits in database or not .If not then pushes user data into database.
        console.log(this.isMobileView);
        this.isMobileView ? this.mobile = 'hidden-xs' : this.mobile = '';

        store.watch(function (state) {
            return state.toggleView
        }, function (data) {
            console.log(data)
            data ? this.mobile = '' : this.mobile = 'hidden-xs'
        }.bind(this))
    }

})
