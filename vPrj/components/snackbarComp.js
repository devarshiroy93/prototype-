Vue.component('snackbar-comp',{
    props:['triggered','action'],
    'template':`
        <div>
            <div id="snackbar" v-if = "triggered" :class="{ show: triggered }"><div class="body2"><span><i class="material-icons checkIcon">check</i></span>{{messages[action]}}<i class="material-icons frClose">close</i></div></div>

            <div id="snackbar" v-if = "triggeredComputed" :class="{ show: triggered }"><div>{{messages[action]}}</div></div>

        </div>
    `,
	 data: function () {
        return {
            messages : {
				addFriend : 'Friend Request Sent !',
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