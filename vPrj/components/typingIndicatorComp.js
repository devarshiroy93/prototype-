Vue.component('typing-indicator',{
     props : ['user','isTyping'],
    'template' : `<div v-if="isTyping" v-if="showComp"  v-scrolling = "'chatWindowMessageChain'" ><span class="typingIndicator">{{user}} is typing...</span></div>`
})