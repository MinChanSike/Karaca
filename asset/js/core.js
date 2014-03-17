Core = {

    init:function(){
        $(document).ready(function(){
            Core.initChosen();
        });
    },
    initChosen:function(){
        $(".select").chosen();
    }

}

Core.init();