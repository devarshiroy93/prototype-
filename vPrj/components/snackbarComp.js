Vue.component('snackbar-comp',{
    props:['triggered','action'],
    'template':`
        <div>
            <div id="snackbar" v-if = "triggered" :class="{ show: triggered }"><div>{{messages[action]}}</div><a  >&times;</a></div>
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