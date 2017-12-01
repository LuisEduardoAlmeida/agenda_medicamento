var load_search = function() {
    var cont_search   = 1;
    var input_padrao  = $('<input id="search_valor" class="string required form-control" name="search[valor]"  type="text" style="width: 100%;">')

    $(".form-search").on( "change","select", function(e, manter_valor) {   
      if ($(this).attr("id") == "search_coluna") {
        identificar_tipo_input(manter_valor, $("option:selected", this))

        $(this).attr("name",  "search["+cont_search+"][coluna]" )
        $(this).parents('.params').find("#search_valor").attr("name","search["+cont_search+"][valor]")
        cont_search++
      }
    })

    $(".form-search").on("submit", function(e) {
      $(".search_coluna select").each(function() { 
        $(this).trigger("change", [true]) 
      })
      // e.preventDefault();
    })

    $(".form-search").on( "click",".form-search-add", function() { 
        ativar_select_box(false)

        var param       = $(this).parents(".params")
        var param_clone = param.clone()
        param_clone.find("#search_coluna").val( param.find("#search_coluna").val() )

        param.after(param_clone)
        param.find("#search_coluna option:first").attr("selected","selected")
        param.find(".search_valor").html( input_padrao )

        // Localizar div do botão adicionar
        div_botao = param_clone.find(".form-search-add").parent()
        botao     = param_clone.find(".form-search-add").clone()
        // Remover botão adicionar
        param_clone.find(".form-search-add").remove()

        // Adicionar botão remover
        div_botao.append( botao.removeClass('form-search-add glyphicon glyphicon-plus btn-success').addClass("btn-danger glyphicon glyphicon-remove form-search-del") )
        
       ativar_select_box(true)
    })

    $(".form-search").on( "click",".form-search-del", function() { 
        $(this).parent().parent(".params").remove()
    })

    function identificar_tipo_input(manter_valor, obj_select) {
      ativar_select_box(false)

      var obj_select = (obj_select) ? obj_select.filter( ":selected" ) : $(".form-search .search_coluna select option:selected")

      obj_select.each(function() { 
          var coluna      = $(this).val()
          var tipo        = $(this).data("tipo")
          var input_val   = $(this).parents('.params').find("#search_valor") 
          var div_input   = input_val.parent() 
          var valor       = (manter_valor) ? input_val.val() : ""

          div_input.html( search_select_gerar(coluna, tipo, valor) )
      })

     ativar_select_box(true)
    }

    function search_select_gerar (coluna, tipo, valor) {
        var rota_modelo = $(".form-search").data("route-model")
        
        switch(tipo) {
        case "string":
            return input_padrao.clone().val(valor) 
        case "boolean":
            return $('<select id="search_valor" class="select2 select required form-control" name="search[valor]" style="width: 100%;">').append( $("<option>").text("Sim").val("true"), $("<option>").text("Não").val("false") ).val(valor)
        case "integer":
          if (coluna.search("_id") > -1)
            var input       = ajax_belongs_to_has_many(rota_modelo, coluna, valor)
          else
            var input = search_select_gerar(coluna,'string',valor)
          
          return input;
        case "has_many":
          var input       = ajax_belongs_to_has_many(rota_modelo, coluna, valor);
          return input
        default:
            ""
        }
    }

    function ativar_select_box(adicionar) {
      if (adicionar) {
        $("select.select2").not('[class*="select2-offscreen"]').select2({minimumResultsForSearch: 7});
      }else {
        $(".select2").select2("destroy");
      }
    }

    function ajax_belongs_to_has_many(rota_modelo, coluna, valor) {
      var input = ""
      $.ajax({
        type: "get",
        url:  rota_modelo,
        async: false, 
        data: {coluna: coluna, a: Math.random() },
        dataType: "json",
        success: function(data) {
          input = $('<select id="search_valor" class="select2 select required form-control" name="search[valor]" style="width: 100%;">')
          input.append(new Option( "" , "", false, false));
          $.each( data, function(key,val) {
            var id        = ""
            var descricao = [] 
            $.each( val, function(k,chave) { 
              if (id == "")
                id = chave
              else
                descricao.push(chave)
            })
            input.append(new Option( descricao.join(' - ') , id, false, false));
          })
          input.val(valor)
        },
        error: function(data) {
          input = input_padrao.clone().attr("disabled","disabled").val("Não configurado corretamente!")
        }
      })

      return input
    }


    // Identificar no load
    identificar_tipo_input(true);

}

// $(document).ready(load_search)
$(window).bind('page:change', load_search)

