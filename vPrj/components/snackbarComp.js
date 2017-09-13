Vue.component('snackbar-comp',{
    props:['triggered','action'],
    'template':`
        <div>
<<<<<<< HEAD
            <div id="snackbar" v-if = "triggered" :class="{ show: triggered }"><div><span><i class="material-icons">check</i></span>{{messages[action]}}</div></div>
=======
            <div id="snackbar" v-if = "triggeredComputed" :class="{ show: triggered }"><div>{{messages[action]}}</div></div>
>>>>>>> d7b96d53ff980c5bde5b692d2c58f225e926e414
        </div>
    `,
	 data: function () {
        return {
            messages : {
				addFriend : 'Friend Request Sent!',
				addComment : 'Comment has been added'
			},
			triggeredComputed : false
        }
    },
	watch :{
		triggered : function(val){
			this.triggeredComputed = val; 
			if(val){
				setTimeout(function () {
					this.triggeredComputed = false
				}.bind(this), 3000)
			};
		}
	},
	created : function(){
		this.triggeredComputed = this.triggered
	}
})