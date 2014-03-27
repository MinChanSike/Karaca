$( document ).ajaxStart(function() {
    NProgress.start();
});

$( document ).ajaxComplete(function() {
    NProgress.done();
});

$(document).ajaxSuccess(function() {
    NProgress.done();
});


Core = {
    init:function(){
        $(document).ready(function(){
            cPlugins.initAll();
            Fjax.dedectModal();
            dTable.dedectTable();
            Fjax.dedectConfirm();
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
        $(".tarih").mask("99/99/9999");
        $(".telefon").mask("(999) 999-9999");
    },

    initDatePicker:function(){
        $(".dpform").each(function(){
            $(this).datepicker({
                format: 'mm/dd/yyyy'
            });
        });
    },
    initAutoComplete:function(){
        $(".autocomplete").attr('autocomplete', 'off');
        $('.autocomplete').each(function(){
            var source = $(this).attr("data-source");
            if (typeof ac_siteURL != 'undefined') {
                source = ac_siteURL+ source;
            }
            if(source){
                $(this).typeahead({
                    source: function (query, process) {
                        return $.get(source, { query: query }, function (data) {
                            if(query.length<=1){window.disdata='';}
                            if(!window.disdata){
                                window.disdata=data;
                                return process(data.options);
                            }
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
    },
    dedectConfirm:function(){
        $("a.confirm").each(function(){
            $(this).bind("click",function(){
                var confirmMessage = $(this).attr("data-message");
                if(confirmMessage){
                    if(confirm(confirmMessage)==true){
                        location.href=$(this).attr("location");
                    }else{
                        return false;
                    }
                }
                return false;
            });
        });
    }
}

dTable = {
    dedectTable:function(){
        $(".dtable").each(function(){
            var isAjax = $(this).attr("data-table-ajax");
            var source = $(this).attr("data-source");
            var seriColuns = $(this).attr("data-columns");
            var seriVals= $(this).attr("data-vals");
            var customWhere= $(this).attr("data-customwhere");

            var setting = {};

            if(source){
                setting = {
                    "bProcessing": true,
                    "bServerSide": true,
                    "bDestroy": true,
                    "sAjaxSource": source,
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        aoData.push({"name":"columns","value":seriColuns});
                        aoData.push({"name":"columnsval","value":seriVals});
                        aoData.push({"name":"customwhere","value":customWhere});
                        $.ajax({
                            "dataType": "json",
                            "type": "POST",
                            "url": sSource,
                            "data": aoData,
                            "success": fnCallback
                        }).done(function(){
                            cPlugins.initAll();
                            Fjax.dedectModal();
                            Fjax.dedectConfirm();
                        });
                    },
                    "oLanguage": {
                        "sUrl": siteURL+'datatable/getlanguagedata'
                    }
                };
            }
            var Dtablem = $(this).dataTable(setting);
            //dTable.changeContentFilter(Dtablem);
        });
    },
    changeContentFilter:function(oTable){
        alert('merba');
        $(".tfoot").each( function ( i ) {
            alert('selmai');
            this.innerHTML = fnCreateSelect( oTable.fnGetColumnData(i) );
            $('select', this).change( function () {
                oTable.fnFilter( $(this).val(), i );
            } );
        } );
        cPlugins.initAll();
    }
}

Core.init();