Vue.component('readmore-comp',{
props :['postData'],
template : `<div class="readMore body3"><p v-on:click="redirectToIndividualPost(postData)">Read More</p></div>`,
methods : {
	redirectToIndividualPost : function(){
		this.$emit('redirect',this.postData);
	}
}
})
