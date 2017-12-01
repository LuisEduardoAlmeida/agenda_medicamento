var checkAll = function(item, url) {
  img_loading = '<img alt="Ajax loader" height= "15px" class="loading" src="/assets/ajax-loader.gif">'       
  execute_ajax($(item), url)
}

var execute_ajax = function(item, url) {
  
  $.ajax({
      url: url,
      async : true,
      type: "GET",    
    beforeSend: function(xhr, opts){
      $(item).slideDown(1000)
      $(item).prepend(img_loading)
      panel = $(item).parent().parent().parent()
      if (panel.find('.panel-title').find('.loading').length == 0) {
        panel.find('.panel-title').prepend(img_loading)  
      }
      
    },
    success: function(data) {      
      $(item).find('.loading').remove()            
      $(item).removeClass('alert-default')      
      panel = $(item).parent().parent().parent()
      
      btn_success = '<span class="glyphicon glyphicon-ok pull-right "> </span>'
      btn_danger = '<span class="glyphicon glyphicon-remove pull-right  "></span>'
      
      if (data.status) {
        $(item).addClass('alert-success')        
        $(item).append(btn_success)
        $(item).find('.text').html(data.message_success)
      } else {
        $(item).addClass('alert-danger')           
        $(item).append(btn_danger)                
        $(item).find('.text').html(data.message_error)
      }
      
      
      sucessos = panel.find('.alert-success').length
      errors = panel.find('.alert-danger').length
      if (sucessos == 3) {
        panel.find('.panel').removeClass('panel-info')
        panel.find('.panel').addClass('panel-success')        
      } 

      
      
      if (errors == 1) {
        panel.find('.panel').removeClass('panel-info')
        panel.find('.panel').addClass('panel-danger')
      }

      panel.find('.panel-title').find('.loading').remove()

    },
    error: function() {
        $(item).find('.loading').remove()      
        $(item).removeClass('alert-default')
        $(item).addClass('alert-danger')
        panel = $(item).parent().parent().parent()
        btn_danger = '<span class="glyphicon glyphicon-remove pull-right "> </span>'
        
        panel.find('.panel').removeClass('panel-info')
        panel.find('.panel').addClass('panel-danger')

        errors = panel.find('.alert-danger').length
        
        $(item).append(btn_danger)
    }

    });
}




var checkUnorc = function(panel) {
  limites      = panel.find('.alert-0')[0]
  detalhamento = panel.find('.alert-1')[0]
  acoes        = panel.find('.alert-2')[0]
  fpl          = panel.find('.alert-3')[0]
  acao_produto_unidade  = panel.find('.alert-4')[0]
  acoes_sem_meta_fisica = panel.find('.alert-5')[0]
  
  panel.show()
  panels   = $('.panel-unorc-checkup')
  var urls = ["/programas", "/admin"];

  checkAll(limites, '/unidades_orcamentarias/'+ panel.data('unorc')[1] +'/checkup/limites')  
  checkAll(detalhamento, '/unidades_orcamentarias/'+ panel.data('unorc')[1] +'/checkup/detalhamento' )
  checkAll(acoes, '/unidades_orcamentarias/'+ panel.data('unorc')[1] +'/checkup/acoes' )
  checkAll(acao_produto_unidade, '/unidades_orcamentarias/'+ panel.data('unorc')[1] +'/checkup/acoes_sem_produto_unidade' )
  checkAll(acoes_sem_meta_fisica, '/unidades_orcamentarias/'+ panel.data('unorc')[1] +'/checkup/acoes_sem_meta_fisica_com_produto_unidade' )
  

  max = panels.length  
  p_item = panel.index() 
  
  if (max > p_item && p_item > -1 ) {
    checkUnorc(panel.next())
  }
}


var checkup = function(unorcs) {

  panels = $('.panel-unorc-checkup')
  $('.panel-body').slideUp()

  $(".panel-heading").on( "click", function() {    
      $(this).parent().find('.panel-body').slideToggle()
  });

  $(".slide-toggle").on( "click", function() {      
      $(this).toggleClass('active')  
      $(".panel").parent().find('.panel-body').slideToggle()
  });

  $(".toggle-dangers").on( "click", function() {      
    
      $(this).toggleClass('active')
      $(".panel-danger").parent().toggle('show')
  });

  $(".toggle-success").on( "click", function() {         
  
      $(this).toggleClass('active')
      $(".panel-success").parent().toggle('show')
  });


  
  checkUnorc(panels.first())
}



