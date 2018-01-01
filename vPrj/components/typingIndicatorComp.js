Vue.component('typing-indicator',{
     props : ['user','isTyping'],
    'template' : '<div v-if="isTyping"><span class="typingIndicator">{{user}} is typing...</span></div>'
})