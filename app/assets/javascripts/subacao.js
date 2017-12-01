
var load_subacao_programa = function(rota) { 
	$(".subacao_programa_buscar_acao").on("change", function() {
		var qs = new QS()
		var ano 										= qs.getVar('ano')
		var programa_id 						= $(this).val()
		var unidade_orcamentaria_id = $("#funcional_programatico_loa_unidade_orcamentaria_id option:selected").val()

		$.post(rota, { programa_id: programa_id, unidade_orcamentaria_id: unidade_orcamentaria_id, ano: ano }, function(rt) {
			$(".subacao_acao_buscar_funcao_subfuncao").html("");
			$(".subacao_acao_buscar_funcao_subfuncao").select2("destroy")
			$(".subacao_acao_buscar_funcao_subfuncao").append(new Option( ""  , "", false, false));

      $.each( rt.acoes, function(key,val) {
        $(".subacao_acao_buscar_funcao_subfuncao").append(new Option( val.codigo + ' - ' + val.descricao  , val.id, false, false));
      })
      $(".subacao_acao_buscar_funcao_subfuncao").select2()
		})

	})

}

var load_subacao_acao = function(rota) {
	$(".subacao_acao_buscar_funcao_subfuncao").on("change", function() {
		var acao_id 		= $(this).val()
		var programa_id = $("select[class*='subacao_programa_buscar_acao']").val()
		var ano 				= getUrlVars().ano

    $.ajax({
	    type: "post",
	    url:  rota,
	    async: false, 
	    data: {acao_id: acao_id,programa_id: programa_id, ano: ano},
	    beforeSend: function() { 
	    	$(".subacao_acao_funcao, .subacao_acao_subfuncao, .subacao_acao_buscar_regiao").html("");
				$(".subacao_acao_funcao, .subacao_acao_subfuncao, .subacao_acao_buscar_regiao").select2("destroy")
	    },
	    success: function(rt) {

	    	if (rt.meta_fisica_ppa != null) {
		    	$('#funcional_programatico_loa_meta_fisica_ppa').val(rt.meta_fisica_ppa)
		    	$('#funcional_programatico_loa_meta_fisica_loa_total').val(rt.meta_fisica_loas)		    	
		    }
		    $('#funcional_programatico_loa_produto_unidade').val(rt.produto_unidade)
		    
	      $.each( rt.funcoes, function(key,val) {
	        $(".subacao_acao_funcao").append(new Option( val.codigo+' - '+val.descricao  , val.id, false, false));
	      })
	      $.each( rt.subfuncoes, function(key,val) {
	        $(".subacao_acao_subfuncao").append(new Option( val.codigo+' - '+val.descricao  , val.id, false, false));
	      })
	      $.each( rt.regioes, function(key,val) {
	      	if (val.id == rt.selected_regiao) {
	      		$(".subacao_acao_buscar_regiao").append(new Option( val.nome  , val.id, true, false));
	      	} else {
	        	$(".subacao_acao_buscar_regiao").append(new Option( val.nome  , val.id, false, false));
	      	}

	      })
	    },
	    complete: function() { 
    		$(".subacao_acao_funcao, .subacao_acao_subfuncao, .subacao_acao_buscar_regiao").select2()
	    }
	  })

	})

	function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}
}

var load_submit_subacao = function() {
	var this_form = $('.new_funcional_programatico_loa, .edit_funcional_programatico_loa')
	this_form.removeAttr('data-remote')

	this_form.on("submit", function(e) {
		var this_form_submit = $(this)
	  e.preventDefault();

	  val_submit  				 = $(this).find("input[name='commit']").val()
	  var meta_fisica_ppa  = parseInt( $('#funcional_programatico_loa_meta_fisica_ppa').val() )
	  var meta_fisica 		 = parseInt( $('#funcional_programatico_loa_meta_fisica').val() ) + 0
	  var meta_fisica_loas = parseInt( $('#funcional_programatico_loa_meta_fisica_loa_total').val() ) + meta_fisica

	  if (meta_fisica_ppa > 0 && (meta_fisica_loas > meta_fisica_ppa) ) {
	  	var msg = '<div class="alert alert-info" role="alert">A meta física da LOA está ultrapassando a meta física prevista no PPA.</div>'
			bootbox.confirm("<br />" + msg + "\nReveja a meta física!", function(result) {
				if (result) {
					this_form.attr('data-remote','true')
					this_form.off("submit")
					this_form_submit.submit();
				}
			}); 
	  }else {
			this_form.attr('data-remote','true')
			this_form.off("submit")
	  }

	});
	
}


