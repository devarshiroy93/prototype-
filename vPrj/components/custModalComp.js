Vue.component('modal-comp', {
	'props': ['showModal', 'modalContent'],
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
	data: function () {
		return {
			contentType: {
				'directContent': this.showDirectContent,
				'uidtype': this.getfromUid,
				'arrayType': 'functionName'
			},
			finalContent: null,
			likeUsers :[]
		}
	},
	watch: {
		'modalContent': function () {
			if (this.modalContent) {
				if (typeof(this.modalContent) === "string") {
				this.contentType['uidtype']();
				} else if (this.modalContent.length === 0) {
					this.contentType['arrayType']();
				}
			}
		}
	},
	methods: {
		closeCustModal: function () {
			this.$emit('close-modal')
		},
		showDirectContent: function () {

		},
		getfromUid: function () {
			var likeUsersArray = [];
			var tempArr = [];
			this.dataBaseFetch().then(function (value) {
				 tempArr = Object.keys(value);
				for (var i = tempArr.length-1 ; i >= 0 ; i--){
					likeUsersArray.push(value[tempArr[i]].likedBy)
				}
				this.likeUsers = likeUsersArray;
			}.bind(this))
		},
		dataBaseFetch: function () {
			return firebase.database().ref('likes').child(this.modalContent).once('value').then(function (snap) {
				return snap.val();
			}).catch(function (error) {
				return error;
			})
		}
	},
	created: function () {

	}
})