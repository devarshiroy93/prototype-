Vue.component('snackbar-comp',{
    props:['triggered','action'],
    'template':`
        <div>
            <div id="snackbar" v-if = "triggered" :class="{ show: triggered }"><div><span><i class="material-icons">check</i></span>{{messages[action]}}</div></div>
        </div>
    `,
	 data: function () {
        return {
            messages : {
				addFriend : 'Friend Request Sent!',
				addComment : 'Comment has been added'
			}
        }
    },
    created:function(){
		
    }
})