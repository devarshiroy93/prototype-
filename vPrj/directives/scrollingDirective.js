Vue.directive('scrolling',{
    componentUpdated : function(el,binding){
        var container ;
        if(el.querySelector('.'+binding.value).length >0 ){
             container = el.querySelector('.'+binding.value);
        }else{
             container = document.querySelector('.'+binding.value);
        }
        container.scrollTop = container.scrollHeight;
    }

})