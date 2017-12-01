var load_panel_avisos = function() {
	$('#new_aviso #unidade_orcamentaria_all').change(function() {
	  if ($(this).is(':checked')) { $('#new_aviso #aviso_unidade_orcamentarias').select2("enable", false).select2('val',""); }
	  else { $('#new_aviso #aviso_unidade_orcamentarias').select2("enable", true); }
	});
}
$(window).bind('page:change', load_panel_avisos)