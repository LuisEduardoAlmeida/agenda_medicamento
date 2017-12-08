class AdminController < ApplicationController
  load_and_authorize_resource

  before_action :set_loa, only: [:index, :loa_gd_chart, :checkup]

	def index
    binding.pry
    
    # @programas              = Programa.accessible_by(current_ability).where(ppa:ppa)
    # @indicadores            = Indicador.accessible_by(current_ability).includes(:programa, :unidades_orcamentarias).where(programa:@programas).where(indicador_search_params).order(:programa_id)
    # @unidades_orcamentarias = loa.unidade_orcamentarias.order(:codigo) 

    # @chart1 = Dashboard::Chart.new(title: 'Monitoramento da Execução por Grupo de Fonte ', renderTo: "monitor-execucao1", type: 'columnStackedPercentage' )
    @chart1.url = 'admin/execucao_fonte_index'
    @chart1.data_format = 3

    # chart1_drilldown = Dashboard::Chart.new title: 'Monitoramento da Execução por Fonte de ', renderTo: 'monitor-execucao1', type: 'columnStackedPercentage'
    chart1_drilldown.url = 'admin/execucao_fonte'
    # chart1_drilldown.parameter = 'grupo'
    # chart1_drilldown.data_format = 3
    # @chart1.chart_drilldown =  chart1_drilldown

    @chart2 = Dashboard::Chart.new title: "Grupos de Despesa - LOA #{loa.ano} - Global", renderTo: 'monitor-execucao', url: 'admin/loa_gd_chart', data_format: 0, type: 'pie'    
    
    # @activities = PublicActivity::Activity.order(created_at: :desc).limit 5

    @usuarios_online = User.online
  end

  def loa_gd_chart
    result_data_chart = Array.new
    
    GrupoDespesa.all.each do |gd|
      valor = gd.valor_global_loa(current_user.loa_session).to_f
      next if valor == 0
      result_data_chart << ["#{gd.descricao} (#{gd.codigo})", gd.valor_global_loa(current_user.loa_session).to_f]
    end

    render :json => result_data_chart, root: false
  end

  def execucao_fonte_index

    #this is bad.. but I don't have a better idea right now
    unless $saff.active?
      $saff = TinyTds::Client.new(:username => 'ploutos', :password => 'saff!R0R', :host => '172.19.1.19', database: 'SAFF2014')
    end

    @result_data_chart = Array.new
    @valor_empenhado_ano = Array.new
    @dotacao_atual = Array.new
    @result_data_chart_drill = Array.new

    GrupoFonte.all.each do |gfonte|
      fontes = gfonte.fontes.pluck(:codigo).map{ |i|   %Q('#{i}') }.join(',')
      fontexexecucao = $saff.execute("select SUM(vDotAtual) AS dotacao_atual, SUM(vEmpAno) AS valor_empenhado_ano, SUM(vPagAno) AS valor_pago_ano from execOrc where fonte in (#{fontes})")

      fontexexecucao.each(:as => :hash) do |row|
        dotacao_atual       = (row['dotacao_atual'] - row['valor_empenhado_ano']).to_f
        valor_empenhado_ano = row['valor_empenhado_ano'].to_f
        @dotacao_atual << dotacao_atual
        @valor_empenhado_ano << valor_empenhado_ano
      end

      @result_data_chart << [gfonte.descricao, 'Saldo', @dotacao_atual, 'Empenhado no ano', @valor_empenhado_ano]

    end

    render json: @result_data_chart, root: false

  end

  def execucao_fonte
    @result_data_chart_drill = Array.new
    @dotacao_atual = []
    @valor_empenhado_ano = []
    @fontes = []
    grupofonte = GrupoFonte.find_by(descricao: params[:grupo]).fontes.pluck(:codigo)
    fontes = grupofonte.map{ |i|   %Q('#{i}') }.join(',')
    fontexexecucao = $saff.execute("select fonte, SUM(vDotAtual) AS dotacao_atual, SUM(vEmpAno) AS valor_empenhado_ano, SUM(vPagAno) AS valor_pago_ano from execOrc where fonte in (#{fontes}) group by fonte order by fonte")
    fontexexecucao.each(:as => :hash).each do  |x|
      @dotacao_atual << x['dotacao_atual'].to_f - x['valor_empenhado_ano'].to_f
      @valor_empenhado_ano << x['valor_empenhado_ano'].to_f
      @fontes << x['fonte']
      @result_data_chart_drill << [ x['fonte'], 'Saldo', @dotacao_atual, 'Empenhado no ano',  @valor_empenhado_ano ]
    end

    render json: @result_data_chart_drill, root: false
  end


  def indicador_search_params
    if params.has_key? :indicador
      r = params.require(:indicador).permit(:programa, :fonte).keep_if {  |k,v|
        v.present? and instance_variable_set("@#{k}", v)
      }
      params['indicador']['unidades_orcamentarias'].present? ? r.merge!({unidades_orcamentarias: {id: params['indicador']['unidades_orcamentarias']}}) : r
  end
    
  end

  def checkup
    @unidades_orcamentarias = UnidadeOrcamentaria.distinct.joins(:funcionais_programaticos_loa).where(id: @loa.unidade_orcamentarias.ids).where(funcionais_programaticos_loa:{loa_id: @loa}).order :codigo
  end

  private
    def set_loa
      # Não incluir Estágio nao iniciado.
      # @loa = Loa.elaborada
      @loa = current_user.loa_session
    end
end
