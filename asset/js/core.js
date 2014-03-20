Core = {
    init:function(){
        $(document).ready(function(){
            Core.initChosen();
            Fjax.dedectModal();
            dTable.dedectTable();
        });
    },
    initChosen:function(){
        $(".select").chosen();
    },
    getApiPost:function(route,data,callback){
        $.ajax({
            url:route,
            type :"POST",
            data:data,
            success:function(deger){callback(deger);}
        });
    },
    getApiGet:function(route,data,callback){
        $.ajax({
            url:route,
            type :"GET",
            data:data,
            success:function(deger){callback(deger);}
        });
    }
}


Fjax = {
    dedectModal:function(){
        $("a.modalfjax").each(function(){
            $(this).bind("click",function(){
                Core.getApiGet($(this).attr("href"),{type:'modal'},function(deger){
                    $("body").append(deger);
                });
                return false;
            });
        });
    }
}

dTable = {
    dedectTable:function(){
        $(".dtable").each(function(){
            var isAjax = $(this).attr("data-table-ajax");


            $(this).dataTable();
        });
    }
}

Core.init();