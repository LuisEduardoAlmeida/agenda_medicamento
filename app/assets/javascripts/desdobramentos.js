var loa_desdobramento = function() {

  $("input[id*='_valor_dotacao_atual'], input[id*='_valor_autorizado']").maskMoney({thousands:'.', decimal:',', symbolStay: true, precision: 0});

  $.ajaxSetup({async: false});
  
  loa_desdobramento_unidade_orcamentaria()

  $.ajaxSetup({async: true});

  $("select.select2-credito").select2('destroy');
  $("select.select2-credito").select2({
    matcher: matchStart
  })

}

function loa_desdobramento_unidade_orcamentaria(){
   $('select.loa_desdobramento_det_loa').on('change',function(){
    var select_div                = $(this).parent().parent()
    var select_det_loa            = select_div.find('select[class*="loa_desdobramento_det_loa"]').first()
    var loa_desdobramento_det_loa_hint    = select_div.find('.loa_desdobramento_det_loa_hint').first()
    var loa_meta_financeira_det_loa_hint  = select_div.find('.loa_meta_financeira_det_loa_hint').first()

    var valor_saldo_dotacao        = select_det_loa.find('option:selected').data('saldo-dotacao-atual')
    var valor_sequencia_desdobrado = select_det_loa.find('option:selected').data('valor-sequencia-desdobrado')
    
    if (valor_saldo_dotacao == undefined) {
      valor_saldo_dotacao = "0,00"
    }
    if (valor_sequencia_desdobrado == undefined){
      valor_sequencia_desdobrado = "0,00"
    }

    if (parseInt(valor_sequencia_desdobrado) <= parseInt(valor_saldo_dotacao) && (parseInt(valor_saldo_dotacao) >= 0)) {
      loa_desdobramento_det_loa_hint.html("Saldo Dotação Atual: " + valor_saldo_dotacao + "<br>Total desdobrado no sequencial: " + valor_sequencia_desdobrado +"<br><b>*Saldo da Dotação  Atual = Dotação Orçamentária Atual(Lei +Créditos) - Empenhado - NAD - Saldo de Contrato")
      loa_desdobramento_det_loa_hint.removeClass("alert-danger").addClass("alert-success");
      loa_desdobramento_det_loa_hint.show();
    }
    else {
      loa_desdobramento_det_loa_hint.html("Saldo Dotação Atual: " + valor_saldo_dotacao + "<br>Total desdobrado no sequencial: " + valor_sequencia_desdobrado + "<br><b>*Saldo da Dotação  Atual = Dotação Orçamentária Atual(Lei +Créditos) - Empenhado - NAD - Saldo de Contrato")
      loa_desdobramento_det_loa_hint.removeClass("alert-success").addClass("alert-danger");
      loa_desdobramento_det_loa_hint.show()
    }
  });


  $("select.select2-desdobramento").select2({
    matcher: matchStart
  })

}

function matchStart (term, text) {
  if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
    return true;
  }
  return false;
}


$(document).ready(loa_desdobramento)
$(window).bind('page:load', loa_desdobramento)
