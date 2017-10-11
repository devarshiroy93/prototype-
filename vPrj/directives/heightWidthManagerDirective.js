Vue.directive('heightwidth-manage',{
    componentUpdated : function(el){
         store.getters.getCurrentView ?el.querySelector('.modal-content').style.width = '100%' : '';
         el.querySelector('.modal-content').style.height =(( el.querySelectorAll('.friendRequest').length+1) * (el.querySelector('.friendRequest').offsetHeight)) + 'px'
    }

})