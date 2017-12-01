 
var loa_timeout_in = function() {
	$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
	  // if (jqxhr.responseText.search("registrar-se ou fazer login") > -1 || jqxhr.responseText.search("login novamente para continuar") > -1) 
	  if (jqxhr.status == 401)
	   document.location.reload()
	});
}

$(document).ready(loa_timeout_in)
$(window).bind('page:load', loa_timeout_in)
