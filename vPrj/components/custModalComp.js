Vue.component('modal-comp',{
	'props' : ['showModal','modalContent'],
	'template': `<div>
					<div id="myModal" class="modal" v-if= "showModal">
					<!-- Modal content -->
					<div class="modal-content">
					<span class="close" v-on:click ="closeCustModal">&times;</span>
					<p>{{modalContent}}</p>
					<div>
					</div>
					</div>
				</div>
			</div>`,
data : function(){
	return{
		contentType : {
			'directContent' : showDirectContect,
			'uidtype' : 'functionName',
			'arrayType' : 'functionName'
		}
	}
},
methods : {
	closeCustModal : function(){
	this.$emit('close-modal')
},
showDirectContect : {

}
}			
})