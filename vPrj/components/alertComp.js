Vue.component('alert-comp',{
template : `<div>
				<div class="alert" :class="classes[state]" role="alert" v-if='visibility' id="alert">
					<strong>Oh snap!</strong> Something went wrong. Try submitting again.
				</div>
			</div>`,
    
props: ['visibility','state'],
    
data: function () {
			return {
				classes :{
                    'error': 'alert-danger',
                    'info' : 'alert-info alert-dismissable fade in'
                }
			}
		},
})
