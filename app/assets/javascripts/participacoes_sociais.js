
var load_participacoes_sociais = function(rota) { 
  $(".ps_unidade_orcamentaria").on("change", function() {
    var unidade_orcamentaria_id = $(this).val()
    var rota                    = $(this).data('rota')

    if (unidade_orcamentaria_id != '') {
      $.post(rota, { unidade_orcamentaria_id: unidade_orcamentaria_id }, function(rt) {
        $(".ps_programa").html("");
        $(".ps_programa").select2("destroy")
        $(".ps_programa").append(new Option( ""  , "", false, false));

        $.each( rt.programas, function(key,val) {
          $(".ps_programa").append(new Option( val.codigo + ' - ' + val.descricao  , val.id, false, false));
        })
        $(".ps_programa").select2()
      })
    };

  })

  $(".ps_programa").on("change", function() {
    var unidade_orcamentaria_id = $("select[class*='ps_unidade_orcamentaria']").val()
    var programa_id             = $(this).val()
    var rota                    = $(this).data('rota')
    
    if (unidade_orcamentaria_id != '' && programa_id != '') {
      $.post(rota, { unidade_orcamentaria_id: unidade_orcamentaria_id, programa_id: programa_id }, function(rt) {
        $(".ps_acao").html("");
        $(".ps_acao").select2("destroy")
        $(".ps_acao").append(new Option( ""  , "", false, false));

        $.each( rt.acoes, function(key,val) {
          $(".ps_acao").append(new Option( val.codigo + ' - ' + val.descricao  , val.id, false, false));
        })
        $(".ps_acao").select2()
      })
    };

  })

  // $('.ps_unidade_orcamentaria').trigger("change");
  // $('.ps_programa').trigger("change");  

}
$(window).bind('page:change', load_participacoes_sociais)