Vue.component('snackbar-comp',{
    props:['triggered','action'],
    'template':`
        <div>
            <div id="snackbar" v-if = "triggeredComputed && triggered" :class="{ show: triggered }"><div class="body2"><span ><i class="material-icons checkIcon">check</i></span>{{messages[action]}}<i v-on:click = "closeSnackBar" class="material-icons frClose">close</i></div></div>
        </div>
    `,
	 data: function () {
        return {
            messages : {
				addFriend : 'Friend Request Sent !',
				addComment : 'Comment has been added'
			},
			triggeredComputed : true
			
        }
    },
	methods :{
		closeSnackBar : function(){
			//alert('hi')
			this.triggeredComputed = false;
		}
	}
	
})