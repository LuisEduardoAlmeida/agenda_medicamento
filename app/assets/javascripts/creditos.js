var loa_credito = function() {

  $("input[id*='_valor_dotacao_atual'], input[id*='_valor_autorizado']").maskMoney({thousands:'.', decimal:',', symbolStay: true, precision: 0});

  $.ajaxSetup({async: false});
  
  loa_credito_unidade_orcamentaria()
  // $('.loa_credito_unidade_orcamentaria').trigger('change')

  $.ajaxSetup({async: true});

  $("select.select2-credito").select2('destroy');
  $("select.select2-credito").select2({
    matcher: matchStart
  })

}

function loa_credito_unidade_orcamentaria(){
  $('select.loa_credito_unidade_orcamentaria').off('change')
  $('select.loa_credito_unidade_orcamentaria').change(function() {
    var loa_credito_url           = $('.loa_credito').data('url-unorc-det-loa')
    var select_div                = $(this).parents('div').nextAll()
    var select_det_loa            = select_div.find('select.loa_credito_det_loa').first()
    var loa_credito_det_loa_hint  = select_div.find('.loa_credito_det_loa_hint').first()
    var select_det_loa_h          = select_div.find('input[name="det_loa_hidden"]').first()
    
    var loa_credito_fpl_hint      = select_div.find('.loa_credito_fpl_hint').first()
    var select_fpl_h              = select_div.find('input[name="fpl_hidden"]').first()

    select_det_loa.html('')
    if ($(this).val()) {
      $.get( loa_credito_url, {unidade_orcamentaria_id: $(this).val(), selected: select_det_loa_h.val()}, function( data ) {
        select_det_loa.html(data)
        $("select.select2-credito").select2({
          matcher: matchStart
        })

        loa_credito_det_loa_hint.html("Saldo Dotação Atual: " + select_det_loa.find('option:selected').data('saldo-dotacao-atual'))
        loa_credito_fpl_hint.html("Classificação: " + select_det_loa.find('option:selected').data('classificacao'))
      });
    }
  })

  $('select.loa_credito_det_loa').on('change',function(){
    var select_div                = $(this).parent().parent()
    var select_det_loa            = select_div.find('select[class*="loa_credito_det_loa"]').first()
    var loa_credito_det_loa_hint  = select_div.find('.loa_credito_det_loa_hint').first()

    var loa_credito_fpl_hint      = select_div.find('.loa_credito_fpl_hint').first()
    var select_fpl_h              = select_div.find('input[name="fpl_hidden"]').first()
    var valor_saldo_dotacao       = select_det_loa.find('option:selected').data('saldo-dotacao-atual')
    
    if (valor_saldo_dotacao == undefined) {
      valor_saldo_dotacao = "0,00"
    }

    loa_credito_det_loa_hint.html("Saldo Dotação Atual: " + valor_saldo_dotacao)
    loa_credito_fpl_hint.html("Classificação: " + select_det_loa.find('option:selected').data('classificacao'))
  });


}

function matchStart (term, text) {
  if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
    return true;
  }
  return false;
}


$(document).ready(loa_credito)
$(window).bind('page:load', loa_credito)
