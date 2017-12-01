var load_indicadores = function() { 
  $('.filtro_indicador_medicao select.filtro_unorc').change(function(){
    // alert('teste 2');
    var unidade_orcamentaria_id   = $(this).val()
    var url_filtro = $('.filtro_indicador_medicao').data('url-filtro')
    var select     = $('.filtro_indicador_medicao select.filtro_eixo')
    $('.filtro_indicador_medicao select.filtro_resultado').html('')
    $('.filtro_indicador_medicao select.filtro_resultado').select2("destroy");
    $('.filtro_indicador_medicao select.filtro_objetivo').html('')
    $('.filtro_indicador_medicao select.filtro_objetivo').select2("destroy");
    $('.filtro_indicador_medicao select.filtro_indicador').html('')
    $('.filtro_indicador_medicao select.filtro_indicador').select2("destroy");

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

  $('.filtro_indicador_medicao select.filtro_eixo').change(function(){
    // alert('teste 3');
    var unidade_orcamentaria_id   = $('.filtro_indicador_medicao select.filtro_unorc').val()
    var eixo_estrategico_id       = $(this).val()
    var url_filtro                = $('.filtro_indicador_medicao').data('url-filtro')
    var select                    = $('.filtro_indicador_medicao select.filtro_resultado')
    $('.filtro_indicador_medicao select.filtro_objetivo').html('')
    $('.filtro_indicador_medicao select.filtro_objetivo').select2("destroy");
    $('.filtro_indicador_medicao select.filtro_indicador').html('')
    $('.filtro_indicador_medicao select.filtro_indicador').select2("destroy");
    
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
  
  $('.filtro_indicador_medicao select.filtro_resultado').change(function(){
    // alert('teste 4');
    var unidade_orcamentaria_id   = $('.filtro_indicador_medicao select.filtro_unorc').val()
    var eixo_estrategico_id       = $('.filtro_indicador_medicao select.filtro_eixo').val()
    var resultado_estrategico_id  = $(this).val()
    var url_filtro                = $('.filtro_indicador_medicao').data('url-filtro')
    var select                    = $('.filtro_indicador_medicao select.filtro_objetivo')

    $('.filtro_indicador_medicao select.filtro_indicador').html('')
    $('.filtro_indicador_medicao select.filtro_indicador').select2("destroy");

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

  $('.filtro_indicador_medicao select.filtro_objetivo').change(function(){
    // alert('teste 5');
    var unidade_orcamentaria_id   = $('.filtro_indicador_medicao select.filtro_unorc').val()
    var eixo_estrategico_id       = $('.filtro_indicador_medicao select.filtro_eixo').val()
    var resultado_estrategico_id  = $('.filtro_indicador_medicao select.filtro_resultado').val()
    var objetivo_estrategico_id   = $(this).val()
    var url_filtro                = $('.filtro_indicador_medicao').data('url-filtro')
    var select                    = $('.filtro_indicador_medicao select.filtro_indicador')

    select.html('')
    select.select2("destroy");
    $.get(url_filtro, {unidade_orcamentaria_id: unidade_orcamentaria_id, eixo_estrategico_id: eixo_estrategico_id, resultado_estrategico_id: resultado_estrategico_id, objetivo_estrategico_id: objetivo_estrategico_id  }, function(rt) {
      select.append(new Option( ""  , "", false, false));
      $.each( rt, function( key, val ) {
        select.append(new Option((val.descricao),val.id));
      });
    });

    select.select2();
    select.select2({allowClear: true});
  });
  
  $('select').select2("destroy");
  if ($('.filtro_indicador_medicao select.filtro_unorc').val() != undefined) {
    $.ajaxSetup({async: false});
      $('select').select2("destroy");

      $('select.filtro_unorc').trigger('change')
      $('select.filtro_eixo').val($('#indicador_medicao_eixo_estrategico_aux').val())

      $('select.filtro_eixo').trigger('change')
      $('select.filtro_resultado').val($('#indicador_medicao_resultado_estrategico_aux').val())
      
      $('select.filtro_resultado').trigger('change')
      $('select.filtro_objetivo').val($('#indicador_medicao_objetivo_estrategico_aux').val())
      
      $('select.filtro_objetivo').trigger('change')
      $('select.filtro_indicador').val($('#indicador_medicao_indicador_programa_aux').val())


      $('select').select2();
      $('select').select2({allowClear: true});
    $.ajaxSetup({async: true});
  };
}

$(document).ready(load_indicadores)
$(window).bind('page:change', load_indicadores)
