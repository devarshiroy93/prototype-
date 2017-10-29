Vue.component('chips',{
    'props' :['info'],
    'template' : `  <div class="chip">
                        <img :src=info.photoURL alt="Person" width="96" height="96">
                        {{info.displayName}}
                        <span class="closebtn" v-on:click = "removeInfo(info)">&times;</span>
                    </div>`,
    data : function(){
        return {

        }
    },
    methods : {
        removeInfo : function(info){
            this.$emit('remove-info',info)
        }
    }
})