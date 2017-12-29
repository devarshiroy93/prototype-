Vue.directive('heightwidth-manage',{
    componentUpdated : function(el,binding){ 
         if(binding.value === "messagingWindowHeight"){
             console.log(el.offsetHeight);
             console.log(document.querySelector('.navbar-default').offsetHeight);
             var chatWindowHeight = window.innerHeight-document.querySelector('.navbar-default').offsetHeight -el.querySelector('.sendMessagePanel').offsetHeight-el.querySelector('.chatWindowHeader').offsetHeight -6;
             console.log("chatwindowheight",chatWindowHeight)
             document.querySelector('.chatWindowMessageChain').style.maxHeight = chatWindowHeight+'px';
             document.querySelector('.chatWindowMessageChain').style.minHeight = chatWindowHeight+'px';
             document.querySelector('.chatWindowMessageChain').style.height = chatWindowHeight+'px';
             el.style.height = window.innerHeight-document.querySelector('.navbar-default').offsetHeight + 'px'
             el.style.minHeight = window.innerHeight-document.querySelector('.navbar-default').offsetHeight + 'px';
         }else{
             store.getters.getCurrentView ?el.querySelector('.modal-content').style.width = '100%' : '';
         el.querySelector('.modal-content').style.height =(( el.querySelectorAll('.friendRequest').length+1) * (el.querySelector('.friendRequest').offsetHeight))+(el.querySelectorAll('.friendRequest').length+1)*5 + 'px'
         }
    }

})