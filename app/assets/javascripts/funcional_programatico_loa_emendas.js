var load_emenda = function(){
    visualizar_localizacao();
	$('#funcional_programatico_loa_emenda_reducao_acrescimo').off('change')
	$('#funcional_programatico_loa_emenda_reducao_acrescimo').on('change', function(e) {
		if ($(this).val() == 'REDUCAO') {
			$('#preencher_99').slideDown()
			preencher_99_reducao()
		}else {
			$('#preencher_99').slideUp()

			$('#funcional_programatico_loa_emenda_metafisica').removeAttr('disabled');
			$('#funcional_programatico_loa_emenda_esfera_id').select2('enable', true);
		}
	});

	$('#preencher_99').off('click')
	$('#preencher_99').on('click', function(e) {
		var acao_reserva  = $(this).data('acao-id')
		var fonte_reserva = $(this).data('fonte-id')
		e.preventDefault();

		$.ajaxSetup({async: false});

		$('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').select2('val','71')
		$('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').trigger("change");
		
		$('#funcional_programatico_loa_emenda_funcao_id').select2('val','29')
		$('#funcional_programatico_loa_emenda_funcao_id').trigger("change");

		$('#funcional_programatico_loa_emenda_subfuncao_id').select2('val','114')
		$('#funcional_programatico_loa_emenda_subfuncao_id').trigger("change");

		$('#funcional_programatico_loa_emenda_programa_id').select2('val','114')
		$('#funcional_programatico_loa_emenda_programa_id').trigger("change");

		$('#funcional_programatico_loa_emenda_acao_id').select2('val',acao_reserva)
		$('#funcional_programatico_loa_emenda_acao_id').trigger("change");

		$('#funcional_programatico_loa_emenda_regiao_id').select2('val','8')
		$('#funcional_programatico_loa_emenda_regiao_id').trigger("change");

		$('#funcional_programatico_loa_emenda_codigo').val('0001').trigger("change");
		$('#funcional_programatico_loa_emenda_subacao').val('RESERVA DE CONTINGÊNCIA')

		$('.funcional_programatico_loa_emenda_det_loa_emenda_attributes_fonte_id').select2('val',fonte_reserva)
		$('.funcional_programatico_loa_emenda_det_loa_emenda_attributes_elemento_despesa_id').select2('val','157')
		$('.funcional_programatico_loa_emenda_det_loa_emenda_attributes_induso_id').select2('val','1')
		$('.valor').focus()

		$.ajaxSetup({async: true});

	})

	function preencher_99_reducao() {
		$('#funcional_programatico_loa_emenda_metafisica').val('')
		$('#funcional_programatico_loa_emenda_metafisica').attr('disabled','disabled');
		$('#funcional_programatico_loa_emenda_esfera_id').select2('val','')
		$('#funcional_programatico_loa_emenda_esfera_id').select2('enable',false);
	}


	$('#emenda_motivo_emenda_id').off('click')
	$('#emenda_motivo_emenda_id').on('change', function(e) {
		
		// TEXTO
		if ($(this).val() == '1' || $(this).val() == '2')
			$('#emenda_texto').slideDown()
		else
			$('#emenda_texto').slideUp();

		// VALOR

		if ($(this).val() == '3' || $(this).val() == '4')
			$('#valor_reducao').slideDown()
		else {
			$('#valor_reducao').slideUp();
			$('#emenda_valor_reducao').val('');
		}

	})
	$('#emenda_motivo_emenda_id').trigger("change");


	$('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').off('change');
	$('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').on('change', function(e) {
		var funcoes_url 						= $("form[class*='funcional_programatico_loa_emenda']").data('ajax-funcoes')
		var unidade_orcamentaria_id = $('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val();

		$('#funcional_programatico_loa_emenda_funcao_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_funcao_id').append(new Option('Carregando...','')).select2('val','')
		$('#funcional_programatico_loa_emenda_subfuncao_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_programa_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_acao_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_regiao_id').select2('val','').find('option').remove()

		$.getJSON( funcoes_url, {unidade_orcamentaria_id: $(this).val()}, function( json ) {
			var select = $('#funcional_programatico_loa_emenda_funcao_id')
			select.find('option').remove()

			$.each( json, function( key, val ) {
				select.append(new Option((val.codigo+" - "+ val.descricao),val.id));
		  });

		  select.select2('val','')
		});
	});


	$('#funcional_programatico_loa_emenda_funcao_id').off('change');
	$('#funcional_programatico_loa_emenda_funcao_id').on('change', function(e) {
		var subfuncoes_url 					= $("form[class*='funcional_programatico_loa_emenda']").data('ajax-subfuncoes')
		var unidade_orcamentaria_id = $('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val();

		$('#funcional_programatico_loa_emenda_subfuncao_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_subfuncao_id').append(new Option('Carregando...','')).select2('val','')
		$('#funcional_programatico_loa_emenda_programa_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_acao_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_regiao_id').select2('val','').find('option').remove()

		$.getJSON( subfuncoes_url, {unidade_orcamentaria_id: unidade_orcamentaria_id, funcao_id: $(this).val()}, function( json ) {
			var select = $('#funcional_programatico_loa_emenda_subfuncao_id')
			select.find('option').remove()

			$.each( json, function( key, val ) {
				select.append(new Option((val.codigo+" - "+ val.descricao),val.id));
		  });

		  select.select2('val','')
		});
	});


	$('#funcional_programatico_loa_emenda_subfuncao_id').off('change');
	$('#funcional_programatico_loa_emenda_subfuncao_id').on('change', function(e) {
		var programas_url 					= $("form[class*='funcional_programatico_loa_emenda']").data('ajax-programa')
		var unidade_orcamentaria_id = $('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val();
		var funcao_id 							= $('#funcional_programatico_loa_emenda_funcao_id').val();

		$('#funcional_programatico_loa_emenda_programa_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_programa_id').append(new Option('Carregando...','')).select2('val','')
		$('#funcional_programatico_loa_emenda_acao_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_regiao_id').select2('val','').find('option').remove()

		$.getJSON( programas_url, {unidade_orcamentaria_id: unidade_orcamentaria_id, funcao_id: funcao_id, subfuncao_id: $(this).val()}, function( json ) {
			var select = $('#funcional_programatico_loa_emenda_programa_id')
			select.find('option').remove()

			$.each( json, function( key, val ) {
				select.append(new Option((val.codigo+" - "+ val.descricao),val.id));
		  });

		  select.select2('val','')
		});
	});

	$('#funcional_programatico_loa_emenda_programa_id').off('change');
	$('#funcional_programatico_loa_emenda_programa_id').on('change', function(e) {
		var aceos_url 							= $("form[class*='funcional_programatico_loa_emenda']").data('ajax-acao')
		var unidade_orcamentaria_id = $('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val();
		var funcao_id 							= $('#funcional_programatico_loa_emenda_funcao_id').val();
		var subfuncao_id						= $('#funcional_programatico_loa_emenda_subfuncao_id').val();

		$('#funcional_programatico_loa_emenda_acao_id').select2('val','').find('option').remove()
		$('#funcional_programatico_loa_emenda_acao_id').append(new Option('Carregando...','')).select2('val','')
		$('#funcional_programatico_loa_emenda_regiao_id').select2('val','').find('option').remove()

		$.getJSON( aceos_url, {unidade_orcamentaria_id: unidade_orcamentaria_id,funcao_id: funcao_id,subfuncao_id: subfuncao_id, programa_id: $(this).val()}, function( json ) {
			var select = $('#funcional_programatico_loa_emenda_acao_id')
			select.find('option').remove()

			$.each( json, function( key, val ) {
				select.append(new Option((val.codigo+" - "+ val.descricao),val.id));
		  });

		  select.select2('val','')
		});
	});


	$('#funcional_programatico_loa_emenda_acao_id').off('change');
	$('#funcional_programatico_loa_emenda_acao_id').on('change', function(e) {
		var regioes_url = $("form[class*='funcional_programatico_loa_emenda']").data('ajax-regiao')
		var acao_id 		= $('#funcional_programatico_loa_emenda_acao_id').val();

		$('#funcional_programatico_loa_emenda_regiao_id').select2('val','').find('option').remove()

		$.getJSON( regioes_url, {acao_id: acao_id}, function( json ) {
			var select = $('#funcional_programatico_loa_emenda_regiao_id')

			$.each( json, function( key, val ) {
				select.append(new Option((val.nome),val.id));
		  });

		  select.select2('val','')
		});
	});


	$('#funcional_programatico_loa_emenda_regiao_id').off('change');
	$('#funcional_programatico_loa_emenda_regiao_id').on('change', function(e) {

		// Aditiva de Valor
		if ($(this).parents('form[class*="funcional_programatico_loa_emenda"]').data('motivo-emenda') == 3) {
			var proxima_localizacao_url = $("form[class*='funcional_programatico_loa_emenda']").data('ajax-proxima-localizacao')
			
			var unidade_orcamentaria_id  = $('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val();
			var programa_id  						 = $('#funcional_programatico_loa_emenda_programa_id').val();
			var acao_id 		 						 = $('#funcional_programatico_loa_emenda_acao_id').val();
			var funcao_id 	 						 = $('#funcional_programatico_loa_emenda_funcao_id').val();
			var subfuncao_id 						 = $('#funcional_programatico_loa_emenda_subfuncao_id').val();
			var regiao_id 	 						 = $('#funcional_programatico_loa_emenda_regiao_id').val();
			var fpl_emenda_id 					 = $('#funcional_programatico_loa_emenda_funcional_programatico_loa_emenda_id').val();
			$.getJSON( proxima_localizacao_url, {unidade_orcamentaria_id: unidade_orcamentaria_id, programa_id: programa_id, acao_id: acao_id, funcao_id: funcao_id, subfuncao_id: subfuncao_id, regiao_id: regiao_id, fpl_emenda_id: fpl_emenda_id}, function( json ) {
			  $('#funcional_programatico_loa_emenda_codigo').val(json.proxima_localizacao);
			  $('#funcional_programatico_loa_emenda_codigo').trigger("change");
			});
		};

	});

	// Modificativa de Valor

	$('#funcional_programatico_loa_emenda_codigo').off('change')
	$('#funcional_programatico_loa_emenda_codigo').on('change', function(e) {
		if ($(this).val().length == 4) {
			var unidade_orcamentaria_id  = $('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val();
			var programa_id  						 = $('#funcional_programatico_loa_emenda_programa_id').val();
			var acao_id 		 						 = $('#funcional_programatico_loa_emenda_acao_id').val();
			var funcao_id 	 						 = $('#funcional_programatico_loa_emenda_funcao_id').val();
			var subfuncao_id 						 = $('#funcional_programatico_loa_emenda_subfuncao_id').val();
			var regiao_id 	 						 = $('#funcional_programatico_loa_emenda_regiao_id').val();
			var codigo 									 = $('#funcional_programatico_loa_emenda_codigo').val();

			var fpl_url 								= $("form[class*='funcional_programatico_loa_emenda']").data('ajax-fpl')
			var span_aviso 							= $('<span class="help-block" id="codigo_fpl_nao_existe">')
			var form_control						= $(this).parents('div:first')
			form_control.find('.help-block').remove()

			if ($(this).parents('div:first').find('#codigo_fpl_nao_existe').size() == 0) {
				form_control.append(span_aviso)
			}

			$.getJSON( fpl_url, {unidade_orcamentaria_id: unidade_orcamentaria_id, programa_id: programa_id, acao_id: acao_id, funcao_id: funcao_id, subfuncao_id: subfuncao_id, regiao_id: regiao_id, codigo: codigo}, function( json ) {
				if (json != null) {
					$('#funcional_programatico_loa_emenda_subacao').val(json.subacao)
					$('#codigo_fpl_nao_existe').text("Localização Encontrada")
					form_control.removeClass('has-error').addClass('has-success')
					
				}else {
					$('#funcional_programatico_loa_emenda_subacao').val('')
					$('#codigo_fpl_nao_existe').text("Localização Não Encontrada")
					form_control.removeClass('has-success').addClass('has-error')
				}
			});
		};
	});


	// Rodar ao carregar

	if ($('#funcional_programatico_loa_emenda_reducao_acrescimo').val() == "REDUCAO") {
		preencher_99_reducao()
	}

	if ($('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val() != '' && $('#funcional_programatico_loa_emenda_programa_id').val() == '') {
		$('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').trigger("change");
	};
	
	if ($('#funcional_programatico_loa_emenda_programa_id').val() != '' && $('#funcional_programatico_loa_emenda_acao_id').val() == '') {
		$('#funcional_programatico_loa_emenda_programa_id').trigger("change");
	};

	setTimeout(function(){
		$('#funcional_programatico_loa_emenda_reducao_acrescimo').trigger("change");
	},50)

	$( document ).ajaxComplete(function() {
	  visualizar_localizacao();
	});

 	function visualizar_localizacao() {
 		if (
 		   !isNaN(parseInt($('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val()))
 		&& !isNaN(parseInt($('#funcional_programatico_loa_emenda_funcao_id').val()))
 		&& !isNaN(parseInt($('#funcional_programatico_loa_emenda_subfuncao_id').val()))
		&& !isNaN(parseInt($('#funcional_programatico_loa_emenda_programa_id').val()))
 	 	&& !isNaN(parseInt($('#funcional_programatico_loa_emenda_acao_id').val()))
		){
		  var query_string = new QS();
		 	var visualizar_localizacao_link = $("#visualizar_localizacao").attr('href');

		 	query_string.add('unidade_orcamentaria_id', $('#funcional_programatico_loa_emenda_unidade_orcamentaria_id').val());
		 	query_string.add('funcao_id', $('#funcional_programatico_loa_emenda_funcao_id').val());
		 	query_string.add('subfuncao_id', $('#funcional_programatico_loa_emenda_subfuncao_id').val());
		  query_string.add('programa_id', $('#funcional_programatico_loa_emenda_programa_id').val());
		  query_string.add('acao_id', $('#funcional_programatico_loa_emenda_acao_id').val());

 			$("#visualizar_localizacao").show();
 			$("#visualizar_localizacao").attr('href', (visualizar_localizacao_link + '?' + query_string.getQueryString()) ) 
 		}
 		else {
 			$("#visualizar_localizacao").hide();
 		}
 	}
}



$(document).ready(load_emenda)
$(window).bind('page:change', load_emenda)

