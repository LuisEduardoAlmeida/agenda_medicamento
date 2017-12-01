$(window).bind('page:update', function() {

  //unidade_orcamentaria_reducao  # initializar in form.html 

  if (typeof unidade_orcamentaria_reducao != 'undefined') {
    if (unidade_orcamentaria_reducao == true) {
     $('.acrescimo_unidades_orcamentarias').last().show()
    }
    else{
      $('.acrescimo_unidades_orcamentarias').last().hide() 
    }
  }

  $('.unidade_orcamentaria_reducao').off('click')
  $('.unidade_orcamentaria_reducao').off('change')

  $('.unidade_orcamentaria_reducao').on('click change',function(){
    if ($('.acrescimo_unidades_orcamentarias').last().find('select').val() == null) {
      if ($(this).is(":checked")) {
        $('.acrescimo_unidades_orcamentarias').last().show()
      }else {
        $('.acrescimo_unidades_orcamentarias').last().hide()  
      }
    }else {
      return false
    }
  })

})

