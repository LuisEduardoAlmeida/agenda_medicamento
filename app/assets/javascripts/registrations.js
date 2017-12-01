
var load_registration = function(){
	$("form").on( "click",".add_nested_fields", function() { 
		setTimeout(function() {$('select.select2').select2({width: 'element'})},1)
	})
}


$(document).ready(load_registration)
$(window).bind('page:change', load_registration)
