Vue.component ('loader-comp',{
    props :['state'],
    template : `<div>
                    <div v-if='state === "loading"'>
                        <div class ="loader"></div>
                    </div>
                </div>`
})