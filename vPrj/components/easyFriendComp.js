//Component to send contact request from posts
Vue.component('easy-friend',{
	'props' : ['userId','postAuthor'],
	'template' : `<div class="addFriend" v-if="userId!==postAuthor"><button title="Add as Friend"><i class="material-icons">person_add</i></button></div>`,
	
})