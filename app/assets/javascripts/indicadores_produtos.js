var load_indicadores_produtos = function() { 
  $('.filtro_indicador_produto select.filtro_unorc').change(function(){
    var unidade_orcamentaria_id = $(this).val()
    var url_filtro              = $('.filtro_indicador_produto').data('url-filtro')
    var select                  = $('.filtro_indicador_produto select.filtro_eixo')
    $('.filtro_indicador_produto select.filtro_resultado').html('')
    $('.filtro_indicador_produto select.filtro_resultado').select2("destroy");
    $('.filtro_indicador_produto select.filtro_objetivo').html('')
    $('.filtro_indicador_produto select.filtro_objetivo').select2("destroy");
    $('.filtro_indicador_produto select.filtro_indicador').html('')
    $('.filtro_indicador_produto select.filtro_indicador').select2("destroy");

    select.html('');
    select.select2("destroy");
    $.get(url_filtro, { unidade_orcamentaria_id: unidade_orcamentaria_id }, function(rt) {
      select.append(new Option( ""  , "", false, false));
      $.each( rt, function( key, val ) {
        select.append(new Option((val.codigo+" - "+ val.descricao),val.id));
      });
    });

    select.select2();
    select.select2({allowClear: true});
  });

  $('.filtro_indicador_produto select.filtro_eixo').change(function(){
    var unidade_orcamentaria_id   = $('.filtro_indicador_produto select.filtro_unorc').val()
    var eixo_estrategico_id       = $(this).val()
    var url_filtro                = $('.filtro_indicador_produto').data('url-filtro')
    var select                    = $('.filtro_indicador_produto select.filtro_resultado')
    $('.filtro_indicador_produto select.filtro_objetivo').html('')
    $('.filtro_indicador_produto select.filtro_objetivo').select2("destroy");
    $('.filtro_indicador_produto select.filtro_indicador').html('')
    $('.filtro_indicador_produto select.filtro_indicador').select2("destroy");
    
    select.html('')
    select.select2("destroy");
    $.get(url_filtro, {unidade_orcamentaria_id: unidade_orcamentaria_id, eixo_estrategico_id: eixo_estrategico_id }, function(rt) {
      select.append(new Option( ""  , "", false, false));
      $.each( rt, function( key, val ) {
        select.append(new Option((val.descricao),val.id));
      });
    });

    select.select2();
    select.select2({allowClear: true});
  });
  
  $('.filtro_indicador_produto select.filtro_resultado').change(function(){
    var unidade_orcamentaria_id   = $('.filtro_indicador_produto select.filtro_unorc').val()
    var eixo_estrategico_id       = $('.filtro_indicador_produto select.filtro_eixo').val()
    var resultado_estrategico_id  = $(this).val()
    var url_filtro                = $('.filtro_indicador_produto').data('url-filtro')
    var select                    = $('.filtro_indicador_produto select.filtro_programa')

    $('.filtro_indicador_produto select.filtro_indicador').html('')
    $('.filtro_indicador_produto select.filtro_indicador').select2("destroy");

    select.html('')
    select.select2("destroy");
    $.get(url_filtro, {unidade_orcamentaria_id: unidade_orcamentaria_id, eixo_estrategico_id: eixo_estrategico_id, resultado_estrategico_id: resultado_estrategico_id }, function(rt) {
      select.append(new Option( ""  , "", false, false));
      $.each( rt, function( key, val ) {
        select.append(new Option((val.descricao),val.id));
      });
    });

    select.select2();
    select.select2({allowClear: true});
  });

  $('.filtro_indicador_produto select.filtro_programa').change(function(){
    var unidade_orcamentaria_id   = $('.filtro_indicador_produto select.filtro_unorc').val()
    var programa_id               = parseInt($(this).val())
    var url_filtro                = $('.filtro_indicador_produto').data('url-filtro')
    var select                    = $('.filtro_indicador_produto select.filtro_sub_produto')

    select.html('')
    select.select2("destroy");
    $.get(url_filtro, {unidade_orcamentaria_id: unidade_orcamentaria_id, programa_id: programa_id  }, function(rt) {
      select.append(new Option( ""  , "", false, false));
      $.each( rt, function( key, val ) {
        select.append(new Option((val.descricao),val.id));
      });
    });

    select.select2();
    select.select2({allowClear: true});
  });
  
  $('select').select2("destroy");
  if ($('.filtro_indicador_produto select.filtro_unorc').val() != "") {
    $.ajaxSetup({async: false});
      $('select').select2("destroy");

      $('select.filtro_unorc').trigger('change')
      $('select.filtro_eixo').val($('#indicador_produto_eixo_estrategico_aux').val())

      $('select.filtro_eixo').trigger('change')
      $('select.filtro_resultado').val($('#indicador_produto_resultado_estrategico_aux').val())
      
      $('select.filtro_resultado').trigger('change')
      $('select.filtro_programa').val($('#indicador_produto_programa_aux').val())
      
      $('select.filtro_programa').trigger('change')
      $('select.filtro_sub_produto').val($('#indicador_produto_sub_produto_aux').val())
      
    $.ajaxSetup({async: true});
  };
  $('select').select2({allowClear: true});
    
}

$(window).bind('page:change', load_indicadores_produtos)
