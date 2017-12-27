Vue.directive('scrolling',{
    componentUpdated : function(el,binding){
        var container = el.querySelector('.'+binding.value);
        container.scrollTop = container.scrollHeight;
    }

})