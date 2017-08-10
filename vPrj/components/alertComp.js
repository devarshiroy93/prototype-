Vue.component('alert-comp',{
template : `<div>
				<div class="alert alert-danger" role="alert" v-if='visibility' id="alert">
					<strong>Oh snap!</strong> Something went wrong. Try submitting again.
				</div>
			</div>`,
props: ['visibility'],
})
