// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery_nested_form
//= require select2
//= require select2_locale_pt-BR
//= require bootbox
//= require highcharts
//= require highcharts-3d
//= require bootstrap-wysihtml5
//= require_tree .
//= require_self

var javascriptsApp = function() {
    // wysihtml5
    $(document).on('page:load', function(){
      window['rangy'].initialized = false
    })

    $(".numero_emenda").mask("9999/9999");
    $(".formato-data").mask("99/99/9999");

    // $('.input-search').slideToggle()
    $("select.select2").select2();
    $("select.select2-clear").select2({allowClear: true});
    $('.table-filter-o').tableFilter({enableCookies: false});

    $('.btn-search').click(function(){

        var toogle_search = function() {
                        if ($('.input-group-search').hasClass('hide-search')) {
                            $('.input-search').show()
                            $('.input-group-search').css('border-right', '0')
                            $('.input-group-search').css('width','200px' )
                            $('.input-group-search').removeClass('hide-search')
                        } else {
                            $('.input-group-search').css('border-right', '1px solid #ccc')
                            $('.input-search').hide()
                            $('.input-group-search').css('width','50px' )
                            $('.input-group-search').addClass('hide-search')
                        }
            }

        toogle_search()

    });

    $(document).ready(function() {
  
      $('.table-filter').tableFilter();

      if ($('#limite_unidade_orcamentaria_id').length > 0) {
          $('.area-quadro-limites').addClass('hide')
      }

      $('#limite_unidade_orcamentaria_id').change(function(){


          option = $('#limite_unidade_orcamentaria_id option:selected').text()
          option_codigo = $('#limite_unidade_orcamentaria_id option:selected').text().split(' - ')
          $('#_filter_4').val('"' +option_codigo[0] + '"'   )


          $('.table-filter').tableFilterApplyFilterValues()
          $('.message-limites-uniorc').html("" + option)
          $(document).ready(function() {
              $('.area-quadro-limites').removeClass('hide')
              $('.table-filter').tableFilterApplyFilterValues()
              total = 0
              if ($('.table-limites > tbody > tr:visible').length > 0) {
                  $('.result').html('')
                  $('.tr-total').show()
                  $('.table-limites > tbody > tr:visible  > td.td-valor').each(function(idx, value){
                      value = parseFloat($(value).attr('data-value'))
                      total = value + total

                  });
                  $('.td-total').html(formatReal(total))


              } else {
                  $('.tr-total').hide()
                  $('.result').html('Não existem limites cadastrados para esta Unidade Orcamentária')
              }

          });

      })
      

      $('#modal-show').on('hidden.bs.modal', function (e) {
        $(this).find('.modal-body').html('Carregando...')
        $(this).find('.modal-title').html('')
      })





      $('select.change_unorc_loa').change(function(){
        var url_unorc  = $(this).data('url-unorcs')
        var this_unorc = $(this)
        var select     = $('select.change_unorc_unorc')

        select.html("");
        select.select2("destroy")
        select.append(new Option( ""  , "", false, false));

        $.post(url_unorc, { loa_id: $(this).val() }, function(rt) {
          $.each( rt, function( key, val ) {
            select.append(new Option((val.codigo+" - "+ val.descricao),val.id));
          });
        });

        select.select2()
      })

    
    });
    //Fim

    // Quadro de Limites Cota




    // Fim Quadro de Limites Cota

    tree_grid();

    $(".hasMessage  h8").hide()
    $('.hasMessage').click(function(e){
        e.preventDefault();
        $(this).find('h8').toggle();
    })

}

var do_on_load = function(){
  javascriptsApp();
}

$(document).ready(do_on_load)
$(window).bind('page:load', do_on_load)


function tree_grid() {
    $('.tree').treegrid();
    $('.tree').treegrid({
        initialState: 'collapsed',
        expanderExpandedClass: 'glyphicon glyphicon-minus',
        expanderCollapsedClass: 'glyphicon glyphicon-plus',
        initialState: 'expanderCollapsedClass',
    });
}


Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "," : d,
    t = t == undefined ? "." : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function QS(){
    this.qs = {};
    var s = location.search.replace( /^\?|#.*$/g, '' );
    if( s ) {
        var qsParts = s.split('&');
        var i, nv;
        for (i = 0; i < qsParts.length; i++) {
            nv = qsParts[i].split('=');
            this.qs[nv[0]] = nv[1];
        }
    }
}

QS.prototype.add = function( name, value ) {
    if( arguments.length == 1 && arguments[0].constructor == Object ) {
        this.addMany( arguments[0] );
        return;
    }
    this.qs[name] = value;
}

QS.prototype.addMany = function( newValues ) {
    for( nv in newValues ) {
        this.qs[nv] = newValues[nv];
    }
}

QS.prototype.remove = function( name ) {
    if( arguments.length == 1 && arguments[0].constructor == Array ) {
        this.removeMany( arguments[0] );
        return;
    }
    delete this.qs[name];
}

QS.prototype.removeMany = function( deleteNames ) {
    var i;
    for( i = 0; i < deleteNames.length; i++ ) {
        delete this.qs[deleteNames[i]];
    }
}

QS.prototype.getVar = function( name ) {
    return this.qs[name]
}

QS.prototype.getQueryString = function() {
    var nv, q = [];
    for( nv in this.qs ) {
        q[q.length] = nv+'='+this.qs[nv];
    }
    return q.join( '&' );
}
QS.prototype.getUrlString = function() {
    var nv, q = [];
    for( nv in this.qs ) {
        q[q.length] = nv+'='+this.qs[nv];
    }
    return document.location.origin + document.location.pathname + "?" + q.join( '&' );
}

QS.prototype.toString = QS.prototype.getQueryString;

$(document).on('page:fetch', function() {
  $('#page-loading').toggle();
});

function call_date_modal() {
  $("input.datepicker").each(function(i) {
    $(this).datepicker({
      altFormat: "yy-mm-dd",
      dateFormat: "dd/mm/yy",
      yearRange: "2000:2025",
      format: "dd/mm/yy",
      language: 'pt-BR',
      minDate: null,
      maxDate: null,
      changeMonth: true,
      changeYear: true,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      altField: $(this).next()
    });
  });
}