Vue.component('loader-comp', {
    props: ['state','size'],
    template: `<div>
                    <div v-if='state === "loading" && size === "big"'>
                        <div class ="loader"></div>
                    </div>
					<div v-if='state === "loading" && size === "small"'>
                        <div class ="loaderSmall"></div>
                    </div>
					
                </div>`
})
