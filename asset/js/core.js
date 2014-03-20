Core = {
    init:function(){
        $(document).ready(function(){
            Core.initChosen();
            Core.initDatePicker();
            Fjax.dedectModal();
            dTable.dedectTable();
        });
    },
    initChosen:function(){
        $(".select").chosen();
    },
    initDatePicker:function(){
        $(".datepicker").datepicker({
            format: 'mm-dd-yyyy'
        });
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
    },
    createID:function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
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
            var Dtablem = $(this).dataTable();
            dTable.changeContentFilter(Dtablem);
        });
    },
    changeContentFilter:function(oTable){
        $("tfoot th").each( function ( i ) {
            this.innerHTML = fnCreateSelect( oTable.fnGetColumnData(i) );
            $('select', this).change( function () {
                oTable.fnFilter( $(this).val(), i );
            } );
        } );
        Core.initChosen();
    }
}

Core.init();