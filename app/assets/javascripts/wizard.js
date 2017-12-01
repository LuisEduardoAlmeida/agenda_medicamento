
wizard = function() {
    $('.modal-footer button').hide();
    $( "#acao_descricao-wizard" ).keypress(function( event ) {
        if (event.which == 13) {
            $('.search-acao-vincular').trigger('click')
        }
    });

    $('.search-acao-vincular').click(function(){
        var loa_id = $('#loa-wizard').val()
        url        = '/loas/' + loa_id + '/acoes/ajax?data=' +  $('#acao_descricao-wizard').val() + '&loa_id=' + loa_id

        $('.list-acoes-found').empty()
        $.getJSON(url, function (data) {
            if (data.length == 0) {

                a = $('<a href="javascript:void(0)" class="list-group-item list-group-item-acao-vincular acao-nao-encontrada" data-action="new"> </a>')
                a.html('Não foram encontradas ações com essa descrição.<br> Clique aqui e depois em avançar para Solicitar uma Proposta de uma nova Ação.')
                $('.list-acoes-found').append(a)
                active()
            } else {
                n = 0
                $.each(data, function(idx, value){
                    a = $('<a href="javascript:void(0)" class="list-group-item list-group-item-acao-vincular"  data-id="'+value.id+'"></a>')
                    a.text(value.codigo + '- ' + value.descricao)
                    $('.list-acoes-found').append(a)
                    n = n + 1
                });
                a = $('<a href="javascript:void(0)" class="list-group-item list-group-item-acao-vincular acao-nao-encontrada"  data-action="new"> </a>')
                desc_acao = n == 1 ? 'Foi encontrado <strong>'+n+'</strong> ação com essa descriçao.' : 'Foram encontradas <strong> '+n+'</strong> ações com essa descrição.'
                a.html(desc_acao + ' <br> Se deseja assim mesmo criar uma nova proposta de ação, clique aqui e depois em avançar.')
                $('.list-acoes-found').prepend(a)
                active()
            }

        })


    })
    $('.step').hide()
    $('.step1').show()


    $('.to-step2').click(function(){
        if ($(".list-group-item-acao-vincular").hasClass("active") == false)
          return false

        $('.step').hide()

        if ($('.list-acoes-found .active').attr('data-action') == 'new') {
            load_form_remote('.step2 .body', 'acoes/new')
        } else {
            load_form_remote('.step2 .body', 'acoes/new_vincular/'+ $('.list-acoes-found .active').attr('data-id'))
        }
        $('.progress-bar-success').attr("aria-valuenow", '99')
        $('.progress-bar-success').attr("style", 'width: 99%')        
        $('.wizard-step strong').html('Passo 2/2')

        // Levar texto informado na pesquisa para o título da nova ação
        
        if ($(".acao-nao-encontrada").hasClass("active")) {
          $(document).ajaxSuccess(function() {
            $("#acao_descricao").val( $("#acao_descricao-wizard").val() )
          });
        }

        $('.step2').show()
    })

    $('.to-step3').click(function(){
        $('.progress-bar-success').attr("aria-valuenow", '70')
        $('.progress-bar-success').attr("style", 'width: 70%')
        $('.step').hide()
        load_form_remote('.step3 .body')
        $('.step3').show()
    })

    active = function(){
        $('.list-group-item-acao-vincular').click(function(){

            $('.list-group-item-acao-vincular').removeClass('active')
            $(this).addClass('active')

        })
    }

}

wizard_produtos = function() {
    $('.modal-footer button').hide();
    $('.to-step2').hide()
    $( "#produto-descricao-wizard" ).keypress(function( event ) {
        if (event.which == 13) {
            $('.search-produto-vincular').trigger('click')
        }
    });

    $('.search-produto-vincular').click(function(){
        $('.to-step2').hide()
        url = '/produtos_unidades/ajax?data=' +  $('#produto-descricao-wizard').val()

        $('.list-produtos-found').empty()
        $.getJSON(url, function (data) {
            if (data.length == 0) {

                a = $('<a href="javascript:void(0)" class="list-group-item list-group-item-produtos-vincular" data-action="new"> </a>')
                a.html('Não foram encontrados Produtos/Unidade com essa descrição.<br> Clique aqui e depois em avançar para Solicitar uma Proposta de um Novo Produto/Unidade.')
                $('.list-produtos-found').append(a)
                active()
            } else {
                $.each(data, function(idx, value){
                    a = $('<a href="javascript:void(0)" class="list-group-item list-group-item-produtos-vincular" data-id="'+value[0]+'"></a>')

                    a.text(value[1] + '- ' + value[2] + ""  )
                    $('.list-produtos-found').append(a)

                });
                active()
            }

        })


    })
    $('.step').hide()
    $('.step1').show()


    $('.to-step2').click(function(){
        $('.step').hide()

        if ($('.list-produtos-found .active').attr('data-action') == 'new') {
            load_form_remote('.step2 .body', 'produtos_unidades/new')
        } else {
            load_form_remote('.step2 .body', 'produtos_unidades/new_vincular/'+ $('.list-produtos-found .active').attr('data-id'))
        }
        $('.progress-bar-success').attr("aria-valuenow", '99')
        $('.progress-bar-success').attr("style", 'width: 99%')
        $('.wizard-step strong').html('Passo 2/2')
        $('.step2').show()
    })

    $('.to-step3').click(function(){
        $('.progress-bar-success').attr("aria-valuenow", '70')
        $('.progress-bar-success').attr("style", 'width: 70%')
        $('.step').hide()
        load_form_remote('.step3 .body')
        $('.step3').show()
    })

    active = function(){
        $('.list-group-item-produtos-vincular').click(function(){

            $('.list-group-item-produtos-vincular').removeClass('active')
            $(this).addClass('active')
            if ($(this).attr('data-id') != null) {
                $('.to-step2').val('Solicitar vinculação').addClass('btn-success')
                $('.to-step2').hide()
            } else {
                $('.to-step2').val('Avançar').removeClass('btn-success')
                $('.to-step2').show()
            }





        })
    }

}



load_form_remote = function(step, url){

    $.ajax({
        url: url+ "?remote=true",
        context: document.body
    }).done(function(data) {

        $(step).html(data)
    });

}
