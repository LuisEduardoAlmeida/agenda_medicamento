var lista_grupos_despesas = null;
function load_ppa_fonte_grupo_despesa(rota) {

  $(".ppa_fonte_buscar").on("change", function() {
    var fonte_id             = $(this).val()
    $.post(rota, { fonte_id: fonte_id }, function(rt) {

      lista_grupos_despesas = rt.grupos_despesas
   
      $(".grupos_despesas_buscar").html("");
      $(".grupos_despesas_buscar").select2("destroy")
      $(".grupos_despesas_buscar").append(new Option( ""  , "", false, false));
 
       $.each( lista_grupos_despesas, function(key,val) {
         $(".grupos_despesas_buscar").append(new Option( val.codigo + ' - ' + val.descricao  , val.id, false, false));
       })
 
      $(".grupos_despesas_buscar").select2();
    })
  });

 }
