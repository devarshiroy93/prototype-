Vue.component('loader-comp', {
    props: ['state','size'],
    template: `<div>
                    <div v-if='state === "loading" && size === "big"'>
                        <div class ="loader"></div>
                    </div>
					<div v-if='state === "loaderSmall" && size === "small"'>
                        <div class ="loader"></div>
                    </div>
					
                </div>`
})
