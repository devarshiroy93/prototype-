Vue.component('alert-comp',{
template : `<div>
				<div class="alert alert-danger" role="alert" v-if='visibility === "true"'>
					<strong>Oh snap!</strong> <a href="#" class="alert-link">Change a few things up</a> and try submitting again.
				</div>
			</div>`,
props: ['visibility'],
})