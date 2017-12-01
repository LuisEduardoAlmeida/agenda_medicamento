function load_fpl() {
	$('.visualizar-orcamento').popover()

	// Relatório
	$('#buscar_form_relatorio #secretaria_ids').change(function() {
	  if ($(this).val() != null) { $('#buscar_form_relatorio #unidade_orcamentaria_ids').select2("enable", false);relatorio_remove_options('unidade_orcamentaria') }
	  else { $('#buscar_form_relatorio #unidade_orcamentaria_ids').select2("enable", true);relatorio_remove_all();}

	});

	$('#buscar_form_relatorio #secretaria_all').change(function() {
	  if ($(this).is(':checked')) { $('#buscar_form_relatorio #secretaria_ids, #buscar_form_relatorio #unidade_orcamentaria_ids').select2("enable", false).select2('val',"");$('#buscar_form_relatorio #unidade_orcamentaria_all').attr("checked", false);relatorio_remove_options('unidade_orcamentaria'); }
	  else { $('#buscar_form_relatorio #secretaria_ids, #buscar_form_relatorio #unidade_orcamentaria_ids').select2("enable", true);}

	});

	$('#buscar_form_relatorio #unidade_orcamentaria_ids').change(function() {
	  if ($(this).val() != null) { $('#buscar_form_relatorio #secretaria_ids').select2("enable", false);relatorio_remove_options('secretaria') }
	  else { $('#buscar_form_relatorio #secretaria_ids').select2("enable", true);relatorio_remove_all(); }

	});

	$('#buscar_form_relatorio #unidade_orcamentaria_all').change(function() {
	  if ($(this).is(':checked')) { $('#buscar_form_relatorio #secretaria_ids, #buscar_form_relatorio #unidade_orcamentaria_ids').select2("enable", false).select2('val',"");$('#buscar_form_relatorio #secretaria_all').attr("checked", false);relatorio_remove_options('secretaria'); }
	  else { $('#buscar_form_relatorio #secretaria_ids, #buscar_form_relatorio #unidade_orcamentaria_ids').select2("enable", true);relatorio_remove_all(); }

	});

	// 
	// Relatóri em PDF ou XLS
	// 
	$('#buscar_form_relatorio #relatorio').change(function() {
		if ( $(this).find('option:selected').data("xls") && ($('#buscar_form_relatorio #unidade_orcamentaria_ids').val() != null || $('#buscar_form_relatorio #secretaria_ids').val() != null)) {
			$('.submit_xls').removeAttr('disabled');
		}else  {
			$('.submit_xls').attr('disabled', 'disabled'); 
		}
		
	});

	buscar_form_relatorio_action = $('#buscar_form_relatorio').attr('action')
	
	$('#buscar_form_relatorio .submit_xls').click(function() {
		$('#buscar_form_relatorio').attr('action', buscar_form_relatorio_action)
		if ($('#buscar_form_relatorio #secretaria_ids').val()!=null) {
			$('#buscar_form_relatorio').attr('action', $('#buscar_form_relatorio').attr('action').replace("reports", $('#buscar_form_relatorio #relatorio').val()	) + "&unidade_orcamentaria_id=" + $('#buscar_form_relatorio #secretaria_ids').val().join(','))
		}else {
			$('#buscar_form_relatorio').attr('action', $('#buscar_form_relatorio').attr('action').replace("reports", $('#buscar_form_relatorio #relatorio').val()	) + "&unidade_orcamentaria_id=" + $('#buscar_form_relatorio #unidade_orcamentaria_ids').val().join(','))
		}
	});


	$('#buscar_form_relatorio .submit_pdf').click(function() {
		$('#buscar_form_relatorio').attr('action', buscar_form_relatorio_action )
	});

 // 
	
	relatorio_options = $('#buscar_form_relatorio #relatorio option').clone()
	relatorio_remove_all();

	$('.buscar_localizacao_ir').on('click', function(e) {
		e.preventDefault();
		var unorc_atual 		= $(this).data('unorc-atual')
		var unorc_corrente 	= $(this).data('unorc-corrente')
		var this_ir = $(this)

		if (unorc_atual != unorc_corrente) {
			bootbox.confirm("A localização escolhida encontra-se em uma unidade orçamentária diferente da sua atual, que é "+unorc_atual+".<br />Deseja mudar sua unidade orçamentária atual para "+unorc_corrente+" e ir até a localização escolhida?", function(result) {
				if (result) { 
					window.open(this_ir.attr("href"),'_blank');
				};
			});
		}else {
			window.open(this_ir.attr("href"),'_blank');
		}
	})


	$('.fpl_relatorio_gerar_relatorio').on('click', function(e) {
		e.preventDefault();
		var unorc_atual 		= $(this).data('unorc-atual')
		var unorc_corrente 	= $(this).data('unorc-corrente')
		var this_ir = $(this)

		if (unorc_atual != unorc_corrente) {
			bootbox.confirm("A localização escolhida encontra-se em uma unidade orçamentária diferente da sua atual, que é "+unorc_atual+".<br />Deseja mudar sua unidade orçamentária atual para "+unorc_corrente+" e ir até a localização escolhida?", function(result) {
				if (result) { 
					window.open(this_ir.attr("href"),'_blank');
				};
			});
		}else {
			window.open(this_ir.attr("href"),'_blank');
		}
	})

}

function relatorio_remove_all() {
	$('#buscar_form_relatorio #relatorio').select2("val", "0");
	$('#buscar_form_relatorio #relatorio option').remove()
	$('.submit_xls').attr('disabled', 'disabled'); 
}

function relatorio_remove_options(tipo) {
	$('#buscar_form_relatorio #relatorio').html(relatorio_options)
	$('#buscar_form_relatorio #relatorio').select2("val", "0");
	re_options = $('#buscar_form_relatorio #relatorio option')
	$('.submit_xls').attr('disabled', 'disabled'); 
	
	if (tipo == 'secretaria') {
		re_options.each(function() { 
			if($(this).data('relatorio') == tipo)
				$(this).remove()
		});
	}
	else if (tipo == 'unidade_orcamentaria') {
		re_options.each(function() { 
			if($(this).data('relatorio') == tipo)
				$(this).remove() 
		});
	}
}

$(window).bind('page:change', load_fpl)
