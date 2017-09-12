//Component to send contact request from posts
Vue.component('easy-friend',{
	'props' : ['userId','postAuthor'],
	'template' : `<div class="addFriend" v-if="userId!==postAuthor"><button v-on:click = "addFriend" title="Add as Friend"><i class="material-icons">person_add</i></button></div>`,
	'methods' : {
		addFriend : function(){
			var details = {
				userId: this.userId,
				postAuthor: this.postAuthor
			}
			this.$emit('add-friend',details)
		}
	}
})