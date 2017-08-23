Vue.component('alert-comp',{
template : `<div>
				<div class="alert body1" :class="classes[state]" role="alert" v-if='showAlert' id="alert">
					<a v-on:click ="closeAlert()" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					<strong v-if='state==="error"'>Oh snap!</strong>  <span  v-if='state==="info"'><span></span>Hi<span class="alertFont subheader">{{userName}}!</span></span> <span>{{messages[state]}}</span>
					
				</div>
			</div>`,
    
props: ['visibility','state','userName'],
    
data: function () {
			return {
				classes :{
                    'error': 'alert-danger',
                    'info' : 'alert-info alert-dismissable '
                },
				messages :{
					'error' : 'Something went wrong .Try submitting again',
					'info'  : 'Welcome to Proto'
				},
				showAlert  : this.visibility
			}
		},
methods : {
	closeAlert : function(){
		this.showAlert = false
	}
}
})
