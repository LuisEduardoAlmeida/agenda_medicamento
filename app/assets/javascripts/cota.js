 
var loa_cota_in = function() {

  $('.set_despesa_cota').on('change',function(){
    var conta_despesa_url = $(this).data('url-elemento-despesa-despesa')

    $.getJSON( conta_despesa_url, {det_loa_id: $(this).val()}, function( json ) {
      var select = $('select[class*="get_despesa_cota"]')
      select.find('option').remove()

      $.each( json, function( key, val ) {
        select.append(new Option((val.codigo+" - "+ val.descricao),val.id));
      });

      select.select2('val','')
    });
  })

  $('.toggle_cotas').click(function() {
    $(this).parents("tr").next().toggle();
    return false;
  });

  $('.get_despesa_cota').on('change',function(){
    var limite_cota_url = $(this).data('url-limite-cota')

    $.getJSON( limite_cota_url, {despesa_id: $(this).val(), det_loa_id: $('#cota_det_loa_id').val(), mes: $('#cota_mes').val() }, function( json ) {
      $('#limite_saldo').text(json.limite_saldo)
      $('#cota_utilizada').text(json.limite_utilizado)
      $('#cota_tipo_despesa').text(json.tipo_despesa)
    });
  })


  if ($('#cota_despesa_id').val() == "") {
   $('.set_despesa_cota').trigger("change");
  }
  
   $('.get_despesa_cota').trigger("change");


 $('.totais_cota').on('dbclick',function(){
  var qs          = new QS();
  var url         = $(this).data('url')
  var this_total  = $(this)

  $.get( url + qs.getQueryString() , function(data) {
    this_total.html(data)
  })

 });


}

$(document).ready(loa_cota_in)
$(window).bind('page:load', loa_cota_in)
