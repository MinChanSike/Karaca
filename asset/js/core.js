Core = {
    init:function(){
        $(document).ready(function(){
            cPlugins.initAll();
            Fjax.dedectModal();
            dTable.dedectTable();
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


cPlugins = {
    initAll:function(){
        cPlugins.initChosen();
        cPlugins.initDatePicker();
        cPlugins.initAutoComplete();
    },
    initChosen:function(){
        $(".select").chosen();
    },
    initDatePicker:function(){
        $(".datepicker").datepicker({
            format: 'mm-dd-yyyy'
        });
    },
    initAutoComplete:function(){
        $('.autocomplete').each(function(){
            var source = $(this).attr("data-source");
            if(source){
                $(this).typeahead({
                    source: function (query, process) {
                        return $.get(source, { query: query }, function (data) {
                            return process(data.options);
                        });
                    }
                });
            }else{
                console.warn("autocomplete için data-source belirtilmemiş");
            }
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
        cPlugins.initChosen();
    }
}

Core.init();