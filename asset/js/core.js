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
        cPlugins.initMask();
    },
    initChosen:function(){
        $(".select").each(function(){
            $(this).chosen();
        });
    },
    initMask:function(){
        $(".datepicker").mask("99/99/9999");
        $(".telefon").mask("(999) 999-9999");
    },

    initDatePicker:function(){
        $(".datepicker").each(function(){
            $(this).datepicker({
                format: 'mm/dd/yyyy'
            });
        });
    },
    initAutoComplete:function(){
        $('.autocomplete').each(function(){
            var source = $(this).attr("data-source");
            if (typeof ac_siteURL != 'undefined') {
                source = ac_siteURL+ source;
            }
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
                    cPlugins.initAll();
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
        cPlugins.initAll();
    }
}

Core.init();