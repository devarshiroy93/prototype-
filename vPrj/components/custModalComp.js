Vue.component('modal-comp', {
	'props': ['showModal', 'modalContent'],
	'template': `<div>
					<div id="myModal" class="modal" v-if= "showModal" v-heightwidth-manage>
					<!-- Modal content -->
					<div class="modal-content">
					<span class="close" v-on:click ="closeCustModal">&times;</span>
					<div v-if='likeUsers.length>0' >
					<div v-for='likeUser in likeUsers'>
					<user-cards :friend = likeUser ></user-cards>
					</div>
					</div>
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
			likeUsers: [],
		}
	},
	watch: {
		'showModal': function () {
			if (this.showModal) {
				if (typeof (this.modalContent) === "string") {
					this.contentType['uidtype']();
				} else if (this.modalContent.length === 0) {
					this.contentType['arrayType']();
				}
			}
		}
	},
	methods: {
		closeCustModal: function () {
			this.$emit('close-modal');
			this.likeUsers = [];
		},
		showDirectContent: function () {

		},
		fetchUsersInfo: function (useruid) {

			return firebase.database().ref('users/').child(useruid).once('value').then(function (response) {
				return response;
			})
				.catch(function (error) {
					return error;
			})


		},
		getfromUid: function () {
			var likeUsersArray = [];
			var tempArr = [];
			this.dataBaseFetch().then(function (value) {
				tempArr = Object.keys(value);
				for (var i = tempArr.length - 1; i >= 0; i--) {
					likeUsersArray.push(value[tempArr[i]].likedBy)
				}
				for (var x = 0; x < likeUsersArray.length; x++) {
					this.fetchUsersInfo(likeUsersArray[x]).then(function (value) {
						this.likeUsers.push(value.val());
					}.bind(this));
				}

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