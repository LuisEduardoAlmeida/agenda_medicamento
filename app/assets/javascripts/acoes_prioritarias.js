var load_acoes_prioritarias = function() {
  var clear_time_out;
  $('.input_acao_prioritaria').on("change", function() {
    var form_rota               = $('.form_meta_fisica').data('url-meta-fisica')
    var acao_prioritaria_id     = $(this).data('acao-prioritaria')
    var valor                   = $(this).val()
    var input_field             = $(this)

    $.ajax({
      type: "post",
      url:  form_rota,
      data: {acao_prioritaria_id: acao_prioritaria_id, valor: valor},
      beforeSend: function() {
        $('.alert-meta-fisica').show()
        clearTimeout(clear_time_out);
      },
      success: function(rt) {
        $('.alert-meta-fisica').removeClass('alert-danger').addClass('alert-success').text('Meta física cadastrada com sucesso.')
        clear_time_out = setTimeout(function(){ $('.alert-meta-fisica').hide();}, 3000)
      },
      complete: function() { 
      },
      error: function(rt) { 
        $('.alert-meta-fisica').removeClass('alert-success').addClass('alert-danger').text(rt.responseText)
        clear_time_out = setTimeout(function(){ $('.alert-meta-fisica').hide();}, 3000)
      }
    })

  })

  $('.input_acao_prioritaria').on("change", function() {
    set_color_meta_fisica_acao_prioritaria($(this))
  })

  $.each($('.input_acao_prioritaria'), function( key, value ) {
    set_color_meta_fisica_acao_prioritaria($(this))
  });
  

}

function set_color_meta_fisica_acao_prioritaria(object){
  if ( parseInt( object.val() ) > 0 ) 
      object.css('background-color', '#c8f7c8')
    else
      object.css('background-color', '#e7c3c3')
}


$(window).bind('page:change', load_acoes_prioritarias)
